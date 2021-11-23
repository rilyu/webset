// BaseEnum.js

import React from 'react';
import PropTypes from 'prop-types';

import {Select as AntSelect, AutoComplete, Button} from 'antd';

import Field from '../Field/Field';

import './BaseEnum.css';

export default class BaseEnum extends Field {

  static propTypes = {
    ...Field.propTypes,
    valueType: PropTypes.oneOf(['string', 'number', 'bool']),
    selectMode: PropTypes.string, // 原 Select.mode , 名称冲突了，增加 combobox 模式采用 AutoComplete 实现
    pageSize: PropTypes.number, // 默认为 0 不分页
    readOnly: PropTypes.bool,
    onDataHandle: PropTypes.func, //(data) => data , 过滤数据或增加数据项
  };

  static defaultProps = {
    ...Field.defaultProps,
    valueType: 'string',
    allowClear: true,
    optionFilterProp: 'children',
    pageSize: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      loading: false,
      data: null,
      searchValue: null,
      pageIndex: 0,
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
      this.setState({loading: false, data, searchValue: null, pageIndex: 0});
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

  onSearch(searchValue) {
    this.setState({searchValue, pageIndex: 0}, () => this.props.onSearch && this.props.onSearch(searchValue));
  }

  renderOptions(Option) {
    let {pageSize} = this.props;
    let {data, searchValue, pageIndex} = this.state;
    if (!data) data = [];
    if (searchValue) {
      searchValue = searchValue.toLowerCase();
      data = data.filter(item => (this.getName(item) || '').toLowerCase().indexOf(searchValue) >= 0);
    }
    let pageCount = 0;
    if (pageSize > 0) {
      pageCount = Math.ceil(data.length / pageSize);
      if (pageIndex >= pageCount) pageIndex = pageCount - 1;
      if (pageIndex < 0) pageIndex = 0;
      data = data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    }
    let options = data.map((item, index) =>
      <Option key={'option' + index} value={this.toString(this.getId(item))} item={item}>
        {this.getName(item)}
      </Option>
    );
    if (pageCount > 1) {
      options.push(
        <Option key='pagination' className='ws-select-pagination' disabled={true}>
          <Button type='link' size='small' icon='vertical-right' disabled={pageIndex === 0} onClick={() => this.setState({pageIndex: 0})} />
          <Button type='link' size='small' icon='left' disabled={pageIndex === 0} onClick={() => this.setState({pageIndex: pageIndex - 1})} />
          <Button type='link' size='small' icon='right' disabled={pageIndex >= pageCount - 1} onClick={() => this.setState({pageIndex: pageIndex + 1})} />
          <Button type='link' size='small' icon='vertical-left' disabled={pageIndex >= pageCount - 1} onClick={() => this.setState({pageIndex: pageCount - 1})} />
        </Option>
      );
    }
    return options;
  }

  renderSelect() {
    let {value, valueType, readOnly, selectMode, pageSize, loading, autoClearSearchValue, onChange, onSearch, onSelect, ...others} = this.otherProps;
    if (loading === undefined) loading = this.state.loading;
    if (readOnly === undefined) readOnly = (this.mergeProps.mode === 'view');
    let readOnlyProps = readOnly ? {open: false, allowClear: false} : {};
    // value 及 Option.value 统一转为字符串，可通过 valueType 属性设定 onChange 的 value 值类型
    return (
      <AntSelect
        mode={selectMode}
        loading={loading}
        autoClearSearchValue={autoClearSearchValue}
        value={this.toString(value)}
        onChange={(value, option) => this.onChange(value, option)}
        onSearch={value => this.onSearch(value)}
        onSelect={(value, option) => {
          if (autoClearSearchValue === undefined || autoClearSearchValue) this.setState({searchValue: null});
          onSelect && onSelect(value, option);
        }}
        {...others}
        {...readOnlyProps}
      >
        {this.renderOptions(AntSelect.Option)}
      </AntSelect>
    );
  }

  renderCombobox() {
    let {value, valueType, readOnly, selectMode, pageSize, loading, optionLabelProp, onChange, onSearch, ...others} = this.otherProps;
    if (loading === undefined) loading = this.state.loading;
    if (readOnly === undefined) readOnly = (this.mergeProps.mode === 'view');
    let readOnlyProps = readOnly ? {open: false, allowClear: false} : {};
    // value 及 Option.value 统一转为字符串，可通过 valueType 属性设定 onChange 的 value 值类型
    return (
      <AutoComplete
        loading={loading}
        optionLabelProp='value'
        value={this.toString(value)}
        onChange={(value, option) => this.onChange(value, option)}
        onSearch={value => this.onSearch(value)}
        {...others}
        {...readOnlyProps}
      >
        {this.renderOptions(AntSelect.Option)}
      </AutoComplete>
    );
  }

  renderDetail() {
    return (this.otherProps.selectMode === 'combobox' ? this.renderCombobox() : this.renderSelect());
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
