// PageTable.js

import React from 'react';
import PropTypes from 'prop-types';

import HoldTable from '../HoldTable/HoldTable';

export default class PageTable extends React.Component {

  static propTypes = {
    ...HoldTable.propTypes, // columns 必填, title 选填
    title: PropTypes.func, // (loading, selectedRows, selectedRowKeys)
    defaultPageSize: PropTypes.number, // 默认每页记录数
    autoLoadData: PropTypes.bool, // 是否自动加载数据
    paginationLoadData: PropTypes.bool, // 是否分页加载数据
    onLoadData: PropTypes.func.isRequired, // async (pageNumber, pageSize), return {success, rows, total}
    onStateChange: PropTypes.func, // (loading, selectedRows, selectedRowKeys)
  };

  static defaultProps = {
    ...HoldTable.defaultProps,
    size: 'small',
    bordered: true,
    rowKey: 'rowKey',
    defaultPageSize: 20,
    autoLoadData: true,
    paginationLoadData: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      rows: null,
      pagination: {
        pageSize: props.defaultPageSize,
        current: 0,
        showSizeChanger: true,
        showTotal: total => '共 ' + total + ' 条记录',
      },
      selectedRowKeys: [],
      selectedRows: [],
    };
  }

  componentDidMount() {
    if (this.props.autoLoadData) this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.onStateChange) return;
    if (prevState.loading !== this.state.loading
      || prevState.selectedRowKeys.length !== this.state.selectedRowKeys.length
      || !prevState.selectedRowKeys.every((item, index) => item === this.state.selectedRowKeys[index])) {
      let {loading, selectedRows, selectedRowKeys} = this.state;
      this.props.onStateChange(loading, selectedRows, selectedRowKeys);
    }
  }

  async loadData(forceLoad = false) {
    this.setState({loading: true});
    try {
      let {pageSize, current} = this.state.pagination;
      let pageNumber = current ? current - 1 : 0;
      if (!forceLoad && !this.props.paginationLoadData && pageNumber !== 0) {
        this.setState({selectedRowKeys: [], selectedRows: []})
      } else {
        let {success, rows, total} = await this.props.onLoadData(pageNumber, pageSize);
        if (success) {
          let {pagination, selectedRowKeys, selectedRows} = this.state;
          pagination.total = total || 0;
          rows = (rows || []).map((item, index) => ({rowKey: `${pageNumber}-${index}`, ...item}));
          selectedRowKeys = selectedRowKeys.filter(key => rows.some(row => row.rowKey === key));
          selectedRows = selectedRowKeys.map(key => rows.filter(row => row.rowKey === key)[0]);
          this.setState({rows, pagination, selectedRowKeys, selectedRows});
        }        
      }
    } catch(err) {
      console.error(err);
    }
    this.setState({loading: false});
  }

  reload() {
    this.loadData(true);
  }

  refresh() {
    let {pagination} = this.state;
    pagination.current = 1;
    this.setState({pagination}, () => this.loadData());
  }

  onChange(pagination, ...args) {
    this.setState({pagination}, () => this.loadData());
    this.props.onChange && this.props.onChange(pagination, ...args);
  }

  rowSelection() {
    let {rowSelection} = this.props;
    let saveOnChange = rowSelection && rowSelection.onChange;
    return {
      type: 'radio',
      columnWidth: 32,
      selectedRowKeys: this.state.selectedRowKeys,
      ...rowSelection,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({selectedRowKeys, selectedRows}, () => saveOnChange && saveOnChange(selectedRowKeys, selectedRows));
      },
    };
  }

  render() {
    let {defaultPageSize, autoLoadData, onLoadData, title, dataSource, rowSelection, pagination, onChange, ...others} = this.props;
    let {loading, selectedRows, selectedRowKeys} = this.state;
    return (
      <HoldTable
        title={typeof title === 'function' ? () => title(loading, selectedRows, selectedRowKeys) : title}
        dataSource={this.state.rows}
        rowSelection={this.rowSelection()}
        pagination={this.state.pagination}
        onChange={(pagination, ...args) => this.onChange(pagination, ...args)}
        {...others}
        />
    );
  }

}
