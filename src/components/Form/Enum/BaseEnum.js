// BaseEnum.js

import React from 'react';
import PropTypes from 'prop-types';

import {Select as AntSelect} from 'antd';

import Field from '../Field/Field';

import './BaseEnum.css';

export default class BaseEnum extends Field {

  static propTypes = {
    ...Field.propTypes,
    valueType: PropTypes.oneOf(['string', 'number', 'bool']),
    selectMode: PropTypes.string, // 原 Select.mode , 名称冲突了
    readOnly: PropTypes.bool,
    onDataHandle: PropTypes.func, //(data) => data , 过滤数据或增加数据项
  };

  static defaultProps = {
    ...Field.defaultProps,
    valueType: 'string',
    allowClear: true,
    optionFilterProp: 'children',
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      loading: false,
      data: null,
    };
  }

  async componentDidMount() {
    super.componentDidMount && super.componentDidMount();
    this.loadData();
  }

  async loadData() {
    this.setState({loading: true});
    try {
      let data = await this.fetchData();
      if (this.props.onDataHandle) data = this.props.onDataHandle(data);
      this.setState({loading: false, data});
    } catch(err) {
      this.setState({loading: false});
      console.error(err);
    }
  }

  async fetchData() {
    return null;
  }

  getId(item) {
    return item && item.id;
  }

  getName(item) {
    return item && item.name;
  }

  getItem(value) {
    let {data} = this.state;
    if (!data) data = [];
    if (value instanceof Array) return data.filter(item => value.indexOf(this.getId(item)) >= 0);
    else return data.filter(item => this.getId(item) === value)[0];
  }

  toString(value) {
    if (value instanceof Array) return value.map(item => this.toString(item));
    return (value !== null && value !== undefined ? value + '' : value);
  }

  toValue(value) {
    if (value instanceof Array) return value.map(item => this.toValue(item));
    let {valueType} = this.otherProps;
    if (value === null || value === undefined || valueType === 'string') return value;
    return (valueType === 'bool' ? value === 'true' : parseFloat(value));
  };

  onChange(value, option) {
    this.props.onChange && this.props.onChange(this.toValue(value), option);
  }

  renderDetail() {
    let {value, valueType, readOnly, selectMode, loading, onChange, ...others} = this.otherProps;
    if (loading === undefined) loading = this.state.loading;
    if (readOnly === undefined) readOnly = (this.mergeProps.mode === 'view');
    let readOnlyProps = readOnly ? {open: false, allowClear: false} : {};
    // value 及 Option.value 统一转为字符串，可通过 valueType 属性设定 onChange 的 value 值类型
    return (
      <AntSelect mode={selectMode} loading={loading} value={this.toString(value)} onChange={(value, option) => this.onChange(value, option)} {...others} {...readOnlyProps}>
        {this.state.data && this.state.data.map((item, index) =>
          <AntSelect.Option key={'option' + index} value={this.toString(this.getId(item))}>{this.getName(item)}</AntSelect.Option>
        )}
      </AntSelect>
    );
  }

  // 支持多个 id 值
  renderValueString(value) {
    let data = this.state.data || [];
    if (!(value instanceof Array)) value = [value];
    value = value.map(item => this.toString(item));
    return value.map(v => {
      let item = data.filter(item => this.toString(this.getId(item)) === v)[0];
      return (item ? this.getName(item) : (v || v === 0 ? `${v}` : ''));
    }).join(',');
  }

}
