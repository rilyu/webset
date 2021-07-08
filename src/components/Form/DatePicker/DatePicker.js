// DatePicker.js

import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import {DatePicker as AntDatePicker, Select as AntSelect} from 'antd';

import Field from '../Field/Field';

import './DatePicker.css';

export default class DatePicker extends Field {

  static propTypes = {
    ...Field.propTypes,
    type: PropTypes.oneOf(['date', 'month', 'year', 'range']),
    valueType: PropTypes.oneOf(['moment', 'string', 'timestamp']),
  };

  static defaultProps = {
    ...Field.defaultProps,
    type: 'date',
    valueType: 'string', // antd 默认为 moment 格式，导致调用者代码比较复杂，因此改为默认字符串
    showTime: false,
    allowClear: true,
    placeholder: '',
  };

  get readOnlyProps() {
    let {readOnly, mode} = this.mergeProps;
    if (readOnly === undefined) readOnly = (mode === 'view');
    return (readOnly ? {open: false, allowClear: false} : {});
  }

  defaultVerifier(field) {
    let {required, value, title} = field.props || {};
    if (required) {
      let valueList = value instanceof Array ? value : [value];
      if (valueList.some(item => (item === null || item === undefined || item === ''))) {
        return title + '不能为空';
      }
    }
    return null;
  }

  get format() {
    let {type, format, showTime} = this.mergeProps;
    if (format) return format;
    switch (type) {
      case 'date': return showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
      case 'month': return 'YYYY-MM';
      case 'year': return 'YYYY';
      case 'range': return showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
      default: return null;
    }
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

  renderDatePicker() {
    let {type, valueType, value, defaultValue, defaultPickerValue, onChange, readOnly, format, ...others} = this.otherProps;
    return (
      <AntDatePicker
        {...others}
        {...this.readOnlyProps}
        format={this.format}
        value={this.momentValue(value)}
        defaultValue={this.momentValue(defaultValue)}
        defaultPickerValue={this.momentValue(defaultPickerValue)}
        onChange={value => onChange && onChange(this.outValue(value))}
        />
    );
  }

  renderMonthPicker() {
    let {type, valueType, value, defaultValue, defaultPickerValue, onChange, readOnly, format, ...others} = this.otherProps;
    return (
      <AntDatePicker.MonthPicker
        {...others}
        {...this.readOnlyProps}
        format={this.format}
        value={this.momentValue(value)}
        defaultValue={this.momentValue(defaultValue)}
        defaultPickerValue={this.momentValue(defaultPickerValue)}
        onChange={value => onChange && onChange(this.outValue(value))}
        />
    );
  }

  renderYearPicker() {
    let {type, valueType, value, defaultValue, onChange, readOnly, format, ...others} = this.otherProps;
    let items = [];
    for (let i = 1970; i <= 2030; i++) items.push(moment([i]));
    return (
      <AntSelect
        {...others}
        {...this.readOnlyProps}
        value={this.stringValue(value)}
        defaultValue={this.stringValue(defaultValue)}
        onChange={value => onChange && onChange(this.outValue(value))}
      >
        {items.map((item, index) =>
          <AntSelect.Option key={'option' + index} value={item.format(this.format)}>{item.format(this.format)}</AntSelect.Option>
        )}
      </AntSelect>
    );
  }

  renderRangePicker() {
    let {type, valueType, value, defaultValue, defaultPickerValue, onChange, readOnly, format, ...others} = this.otherProps;
    return (
      <AntDatePicker.RangePicker
        {...others}
        {...this.readOnlyProps}
        format={this.format}
        value={this.momentValue(value)}
        defaultValue={this.momentValue(defaultValue)}
        defaultPickerValue={this.momentValue(defaultPickerValue)}
        onChange={value => onChange && onChange(this.outValue(value))}
        />
    );
  }

  renderDetail() {
    switch (this.mergeProps.type) {
      case 'date': return this.renderDatePicker();
      case 'month': return this.renderMonthPicker();
      case 'year': return this.renderYearPicker();
      case 'range': return this.renderRangePicker();
      default: return null;
    }
  }

  renderValueString(value) {
    if (!value || (value instanceof Array && value.length === 0)) return '';
    let stringValue = this.stringValue(value);
    if (stringValue instanceof Array) return stringValue.map(item => item || '').join(' ~ ');
    else return stringValue || '';
  }

}
