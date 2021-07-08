// EditTable.js

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Input} from 'antd';
import HoldTable from '../HoldTable/HoldTable';

import './EditTable.css';

export default class EditTable extends React.Component {

  static propTypes = {
    ...HoldTable.propTypes,
    defaultEditAble: PropTypes.bool,
    defaultValueChange: PropTypes.func, // (e: {value, record, index, column, columnIndex})
    editQuery: PropTypes.func, // (record, index)
    exitEditing: PropTypes.shape({ // 退出编辑状态事件，可单独设置
      pressEscape: PropTypes.bool, // 默认为 true
      pressEnter: PropTypes.bool, // 默认为 false
      clickOutside: PropTypes.bool, // 默认为 true
      changeRow: PropTypes.bool, // 默认为 true
    }),
    onStateChange: PropTypes.func, // (selectedRowKeys, editingRowKey)
  };

  static defaultProps = {
    ...HoldTable.defaultProps,
    tableLayout: 'fixed',
    size: 'small',
    bordered: true,
    pagination: false,
    defaultEditAble: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.dataSource,
      selectedRowKeys: [],
      editingRowKey: null,
    };
    this.editingColumnIndex = null;
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.checkExitEditing.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.checkExitEditing);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.dataSource !== prevProps.dataSource) {
      this.setState({dataSource: this.props.dataSource});
    }
    if (JSON.stringify(this.state.selectedRowKeys) !== JSON.stringify(prevState.selectedRowKeys)
      || this.state.editingRowKey !== prevState.editingRowKey) {
      this.props.onStateChange && this.props.onStateChange(this.state.selectedRowKeys, this.state.editingRowKey);
    }
  }

  get exitEditing() {
    return {
      pressEscape: true,
      pressEnter: false,
      clickOutside: true,
      changeRow: true,
      ...this.props.exitEditing,
    };
  }

  checkExitEditing(e) {
    let findCommonParent = (node1, node2) => {
      while ((node1 = node1.parentNode)) {
        if (node1.contains(node2)) return node1;
      }
      return null;
    };
    if (this.state.editingRowKey && this.exitEditing.clickOutside) {
      let node = ReactDOM.findDOMNode(this);
      // 点击在表格之外并且共同祖先不是body，确保点击在 Modal 、 DropDown 等浮层不会关闭编辑状态
      if(!node.contains(e.target) && findCommonParent(node, e.target) !== document.body) {
        this.setState({editingRowKey: null});
      }
    }      
  }

  editRow(rowKey) {
    this.setState({selectedRowKeys: [rowKey], editingRowKey: rowKey});
  }

  selectRows(selectedRowKeys, selectedRows) {
    let {editingRowKey, dataSource} = this.state;
    if (selectedRowKeys.length === 0
      || (selectedRowKeys[0] !== this.state.selectedRowKeys[0] && this.exitEditing.changeRow)) {
      editingRowKey = null;
    }
    if (editingRowKey !== null && selectedRowKeys.length > 0) {
      let {rowKey, editQuery} = this.props;
      let keepEditing = !editQuery;
      if (editQuery && dataSource) {
        for (let i = 0; i < dataSource.length; i++) {
          if (dataSource[i][rowKey] === selectedRowKeys[0]) {
            keepEditing = editQuery(dataSource[i], i);
            break;
          }
        }
      }
      editingRowKey = keepEditing ? selectedRowKeys[0] : null;
    }
    this.setState({selectedRowKeys, editingRowKey});
  }

  cloneEditElement(element, column, columnIndex) {
    let {placeholder, disabled, autoFocus, ...others} = element.props;
    let getElementText = element => {
      if (!element) return '';
      if (typeof element === 'string') return element;
      let children = (element.props.children instanceof Array ? element.props.children : [element.props.children]).filter(Boolean);
      return children.map(item => getElementText(item)).join('');
    };
    if (placeholder === undefined && !disabled) placeholder = `请输入${getElementText(column.title)}`;
    if (autoFocus === undefined) autoFocus = (columnIndex === this.editingColumnIndex || (this.editingColumnIndex === null && columnIndex === 0));
    return React.cloneElement(element, {
      ...others,
      placeholder,
      disabled,
      autoFocus,
    });
  }

  convertColumns(columns) {
    let {rowKey, defaultEditAble, defaultValueChange} = this.props;
    let {dataSource, editingRowKey} = this.state;
    return columns && columns.map((column, columnIndex) => {
      let {onCell, render, renderEdit, ...others} = column;
      return {
        ...others,
        onCell: (record, index) => {
          let {onClick, ...others} = onCell ? onCell(record, index) : {};
          return {
            ...others,
            onClick: e => {
              this.editingColumnIndex = columnIndex;
              onClick && onClick(e);
            },
          };
        },
        render: (text, record, index) => {
          let defaultRender = () => {
            let element = render ? render(text, record, index) : text;
            return (record[rowKey] === editingRowKey ? <div className='ws-edit-cell-static'>{element}</div> : element);
          }
          if (record[rowKey] !== editingRowKey) return defaultRender(); // 非编辑行
          if (renderEdit === false) return defaultRender(); // 指定本列不能编辑
          if (!renderEdit && !defaultEditAble) return defaultRender(); // 未设置 renderEdit 且默认不能编辑
          if (typeof renderEdit === 'function') {
            let element = renderEdit(text, record, index, element => this.cloneEditElement(element, column, columnIndex));
            if (element === false) return defaultRender();
            else if (element !== true) return element;
          }
          let element = (
            <Input
              value={text}
              onChange={e => {
                dataSource[index][column.dataIndex] = e.target.value;
                this.setState({dataSource});
                defaultValueChange && defaultValueChange({value: e.target.value, record, index, column, columnIndex});
              }}
              />
          );
          return this.cloneEditElement(element, column, columnIndex);
        },
      };
    });
  }

  rowSelection() {
    let {onChange, ...others} = this.props.rowSelection || {};
    return {
      type: 'radio',
      columnWidth: 32,
      selectedRowKeys: this.state.selectedRowKeys,
      ...others,
      onChange: (selectedRowKeys, selectedRows) => {
        this.selectRows(selectedRowKeys, selectedRows);
        onChange && onChange(selectedRowKeys, selectedRows);
      },
    };
  }

  onRow(record, index) {
    let {rowKey, editQuery} = this.props;
    let {className, onDoubleClick, onKeyDown, ...others} = this.props.onRow ? this.props.onRow(record, index) : {};
    return {
      ...others,
      className: `${record[rowKey] === this.state.editingRowKey ? 'ws-edit-row' : ''} ${className || ''}`,
      onDoubleClick: e => {
        if (!editQuery || editQuery(record, index)) this.editRow(record[rowKey]);
        onDoubleClick && onDoubleClick(e);
      },
      onKeyDown: e => {
        if ((e.key === 'Escape' && this.exitEditing.pressEscape)
          || (e.key === 'Enter' && this.exitEditing.pressEnter)) {
          e.stopPropagation();
          this.setState({editingRowKey: null});
        }        
        onKeyDown && onKeyDown(e);
      }
    };
  }

  render() {
    let {className, columns, dataSource, rowSelection, onRow, ...others} = this.props;
    return (
      <HoldTable
        {...others}
        className={`ws-edit-table ${className || ''}`}
        columns={this.convertColumns(columns)}
        dataSource={this.state.dataSource}
        rowSelection={this.rowSelection()}
        onRow={(record, index) => this.onRow(record, index)}
        />
    );
  }

}
