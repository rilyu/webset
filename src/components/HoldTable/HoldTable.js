// HoldTable.js

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Table, Empty} from 'antd';

import './HoldTable.css';

export default class HoldTable extends React.Component {

  static propTypes = {
    ...Table.propTypes,
    holdHeight: PropTypes.number, // 如果指定了 holdHeight 则自动预占该高度，使得数据少且有滚动条的表格更加美观
    rangeSelect: PropTypes.bool, // 范围选择，设为 true 会自动开启多选(rowSelection.type = 'checkbox')，支持 shift 范围选择
  };

  static defaultProps = {
    ...Table.defaultProps,
    holdHeight: 0,
    rangeSelect: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      paginationHeight: 0,
      shiftKey: false,
    };
    this.FillTable = props => {
      let changeBodyHeight = v => {
        if (v && v.parentNode) {
          let {holdHeight, dataSource} = this.props;
          let {paginationHeight} = this.state;
          let hasData = dataSource && dataSource.length > 0;
          v.parentNode.style.minHeight = (hasData && holdHeight > 0 ? `${holdHeight - paginationHeight}px` : '');
        }
      };
      return <table {...props} ref={v => changeBodyHeight(v)} />;
    };
  }

  componentDidMount() {
    this.isMount = true;
    this.shiftKeyHandler = e => this.isMount && e.shiftKey !== this.state.shiftKey && this.setState({shiftKey: e.shiftKey});
    window.addEventListener('keydown', this.shiftKeyHandler);
    window.addEventListener('keyup', this.shiftKeyHandler);
  }

  componentWillUnmount() {
    this.isMount = false;
    window.removeEventListener('keydown', this.shiftKeyHandler);
    window.removeEventListener('keyup', this.shiftKeyHandler);
  }

  getNodeHeight(node) {
    if (!node) return 0;
    let style = window.getComputedStyle(node);
    let height = parseFloat(style.getPropertyValue('height'));
    let marginTop = parseFloat(style.getPropertyValue('margin-top'));
    let marginBottom = parseFloat(style.getPropertyValue('margin-bottom'));
    return height + marginTop + marginBottom;
  }

  renderEmpty() {
    let {locale, holdHeight} = this.props;
    let changePlaceholderHeight = v => {
      if (v && v.parentNode && v.parentNode.previousSibling && holdHeight > 0) {
        let marginTop = -1; //查出来的不对，写死
        let siblingHeight = this.getNodeHeight(v.parentNode.previousSibling);
        v.parentNode.style.height = `${holdHeight - marginTop - siblingHeight}px`;
      }
    };
    return (
      <div ref={v => changePlaceholderHeight(v)}>
        {locale && locale.emptyText ? locale.emptyText : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>
    );
  }

  onRow(record, index) {
    let {dataSource, rowKey, rowSelection, rangeSelect} = this.props;
    let {onClick, ...others} = this.props.onRow ? this.props.onRow(record, index) : {};
    return {
      ...others,
      onClick: e => {
        if (rangeSelect && e.shiftKey && this.startIndex !== undefined && this.startDataSource === dataSource) {
          let selectedRowKeys = [], selectedRows = [];
          let startIndex = Math.min(this.startIndex, index), endIndex = Math.max(this.startIndex, index);
          for (let i = startIndex; i <= endIndex; i++) {
            selectedRowKeys.push(dataSource[i][rowKey]);
            selectedRows.push(dataSource[i]);
          }
          rowSelection && rowSelection.onChange && rowSelection.onChange(selectedRowKeys, selectedRows);
        } else {
          this.startIndex = index;
          this.startDataSource = dataSource;
          rowSelection && rowSelection.onChange && rowSelection.onChange([record[rowKey]], [record]);
        }
        onClick && onClick(e);
      },
    };
  }

  render() {
    let {className, style, components, locale, rowSelection, rangeSelect, onRow, ...others} = this.props;
    let calcHeight = v => {
      if (!v) return;
      let domNode = ReactDOM.findDOMNode(v);
      let paginationHeight = Math.floor(this.getNodeHeight(domNode.querySelector('ul.ant-pagination.ant-table-pagination')));
      if (!isNaN(paginationHeight) && paginationHeight !== this.state.paginationHeight) this.setState({paginationHeight});
    };

    return (
      <Table
        {...others}
        className={`ws-hold-table ${className || ''}`}
        style={{...style, userSelect: this.state.shiftKey ? 'none' : undefined}}
        components={{...components, table: this.FillTable}}
        locale={{...locale, emptyText: this.renderEmpty()}}
        rowSelection={rangeSelect ? {...rowSelection, type: 'checkbox'} : rowSelection}
        onRow={(record, index) => this.onRow(record, index)}
        ref={v => calcHeight(v)}
        />
    );
  }

}
