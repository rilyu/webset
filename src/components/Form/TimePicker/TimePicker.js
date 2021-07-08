// TimePicker.js

import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import {TimePicker as AntTimePicker} from 'antd';

import Field from '../Field/Field';

import './TimePicker.css';

export default class TimePicker extends Field {

  static propTypes = {
    ...Field.propTypes,
    valueType: PropTypes.oneOf(['moment', 'string', 'timestamp']),
  };

  static defaultProps = {
    ...Field.defaultProps,
    valueType: 'string', // antd 默认为 moment 格式，导致调用者代码比较复杂，因此改为默认字符串
    allowClear: true,
    placeholder: '',
  };

  get format() {
    return this.mergeProps.format || 'HH:mm:ss'
  }

  momentValue(value) {
    if (value instanceof Array) return value.map(item => this.momentValue(item));
    switch (typeof value) {
      case 'string': return moment(value, this.format);
      case 'number': return moment(value);
      default: return value;
    }
  }

  stringValue(value) {
    if (value instanceof Array) return value.map(item => this.stringValue(item));
    value = this.momentValue(value);
    return (value && value.format(this.format));
  }

  timestampValue(value) {
    if (value instanceof Array) return value.map(item => this.timestampValue(item));
    value = this.momentValue(value);
    return (value && value.valueOf());
  }

  outValue(value) {
    switch (this.mergeProps.valueType) {
      case 'moment': return this.momentValue(value);
      case 'string': return this.stringValue(value);
      case 'timestamp': return this.timestampValue(value);
      default: return value;
    }
  }

  renderDetail() {
    let {valueType, value, defaultValue, defaultOpenValue, onChange, readOnly, format, ...others} = this.otherProps;
    if (readOnly === undefined) readOnly = (this.mergeProps.mode === 'view');
    let readOnlyProps = readOnly ? {inputReadOnly: true, open: false, allowClear: false} : {};
    return (
      <AntTimePicker
        {...others}
        {...readOnlyProps}
        format={this.format}
        value={this.momentValue(value)}
        defaultValue={this.momentValue(defaultValue)}
        defaultOpenValue={this.momentValue(defaultOpenValue)}
        onChange={value => onChange && onChange(this.outValue(value))}
        />
    );
  }

  renderValueString(value) {
    return this.stringValue(value) || '';
  }

}
