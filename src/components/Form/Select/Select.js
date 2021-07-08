// Select.js

import React from 'react';
import PropTypes from 'prop-types';

import {Select as AntSelect} from 'antd';

import Field from '../Field/Field';

import './Select.css';

export default class Select extends Field {

  static propTypes = {
    ...Field.propTypes,
    selectMode: PropTypes.string, // 原 Select.mode , 名称冲突了
    readOnly: PropTypes.bool,
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    getItemValue: PropTypes.func, //(item, index) 选择项值，item=items[index]，为空时直接使用item
    getItemText: PropTypes.func, //(item, index) 选择项显示文本，item=items[index]，为空时直接使用item
  };

  static defaultProps = {
    ...Field.defaultProps,
    allowClear: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      loading: false,
      data: typeof props.items === 'function' ? null : props.items,
    };
  }

  async componentDidMount() {
    super.componentDidMount && super.componentDidMount();
    if (typeof this.props.items === 'function') this.loadData();
  }

  async componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState);
    if (prevProps.items !== this.props.items) this.loadData();
  }

  async loadData() {
    let {items} = this.props;
    if (typeof items === 'function') {
      this.setState({loading: true});
      try {
        let data = await items();
        this.setState({loading: false, data});
      } catch(err) {
        this.setState({loading: false});
        console.error(err);
      }      
    } else {
      this.setState({data: items});
    }
  }

  getItemValue(item, index) {
    return this.props.getItemValue ? this.props.getItemValue(item, index) : item;
  }

  getItemText(item, index) {
    return this.props.getItemText ? this.props.getItemText(item, index) : item;
  }

  renderDetail() {
    let {items, getItemValue, getItemText, readOnly, selectMode, loading, ...others} = this.otherProps;
    if (loading === undefined) loading = this.state.loading;
    if (readOnly === undefined) readOnly = (this.mergeProps.mode === 'view');
    let readOnlyProps = readOnly ? {open: false, allowClear: false} : {};
    return (
      <AntSelect mode={selectMode} loading={loading} {...others} {...readOnlyProps}>
        {this.state.data && this.state.data.map((item, index) =>
          <AntSelect.Option key={'option' + index} value={this.getItemValue(item, index)}>{this.getItemText(item, index)}</AntSelect.Option>
        )}
      </AntSelect>
    );
  }

  renderValueString(value) {
    let {data} = this.state;
    for (let i in (data || [])) {
      if (this.getItemValue(data[i], i) === value) return this.getItemText(data[i], i);
    }
    return '';
  }

}
