// FullTable.js

import React from 'react';
import PropTypes from 'prop-types';

import {Pagination} from 'antd';

import HoldTable from '../HoldTable/HoldTable';
import AnimationFrame from '../ScrollView/AnimationFrame'

import './FullTable.css';

export default class FullTable extends React.Component {

  static propTypes = {
    ...HoldTable.propTypes, // columns 必填，每一列均需要指定宽度，超出时自动滚动
    pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({ // 不需要分页时传入false
      total: PropTypes.number,
      pageSize: PropTypes.number,
      current: PropTypes.number,
      onChange: PropTypes.func, // (current, pageSize)
    })]),
    headerHeight: PropTypes.number,
  };

  static defaultProps = {
    ...HoldTable.defaultProps,
    size: 'small',
    bordered: true,
    holdHeight: 200, // 仅在初始渲染有效
    headerHeight: 38, // 表头高度，无法自动计算，如不一致需手动调整
  };

  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        total: 0,
        pageSize: 20,
        current: 1,
        showSizeChanger: true,
        showTotal: total => '共 ' + total + ' 条记录',
      },
      clientWidth: 0,
      clientHeight: 0,
    };
  }

  renderTable() {
    let {className, holdHeight, headerHeight, scroll, pagination, dataSource, ...others} = this.props;
    let {clientWidth, clientHeight} = this.state;
    holdHeight = Math.max(clientHeight - headerHeight - (pagination ? 37 : 0), holdHeight);
    let pageData = () => {
      let {current, pageSize} = {...this.state.pagination, ...pagination};
      if (!pagination || !dataSource || dataSource.length <= pageSize) return dataSource;
      return dataSource.slice((current - 1) * pageSize, current * pageSize);
    };
    return (
      <HoldTable
        className={`ws-full-table ${className || ''}`}
        style={{maxWidth: clientWidth, maxHeight: clientHeight}}
        holdHeight={holdHeight}
        scroll={{x: clientWidth - 16, y: holdHeight, ...scroll}}
        pagination={false}
        dataSource={pageData()}
        {...others}
        />
    );
  }

  renderPagination() {
    if (!this.props.pagination) return false;
    let onChange = (current, pageSize) => {
      this.setState({pagination: Object.assign(this.state.pagination, {current, pageSize})});
      this.props.pagination.onChange && this.props.pagination.onChange(current, pageSize);      
    };
    return (
      <div className='ws-full-table-footer'>
        <div style={{flex: 1}} />
        <Pagination
          {...this.state.pagination}
          {...this.props.pagination}
          size='small'
          onChange={onChange}
          onShowSizeChange={onChange}
          />
      </div>
    );
  }

  render() {
    let checkLayout = v => {
      if (!v) return;
      let {clientWidth, clientHeight} = v;
      if (clientWidth !== this.state.clientWidth || clientHeight !== this.state.clientHeight) {
        this.setState({clientWidth, clientHeight});
      }
    };

    return (
      <div className='ws-full-table-container' ref={v => this.fullTableContainer = v}>
        <AnimationFrame onEvent={() => checkLayout(this.fullTableContainer)} />
        {this.renderTable()}
        {this.renderPagination()}
      </div>
    );
  }
}
