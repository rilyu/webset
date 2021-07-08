// InputNumber.js

import React from 'react';

import {InputNumber as AntInputNumber} from 'antd';

import Field from '../Field/Field';

import './InputNumber.css';

export default class InputNumber extends Field {

  static defaultProps = {
    ...Field.defaultProps,
    min: -Infinity,
    max: Infinity,
    step: 1,
  };

  stringToNumber(value) {
    let result = parseFloat(value);
    if (isNaN(result)) result = null;
    return result;
  }

  renderDetail() {
    let {value, defaultValue, readOnly, ...others} = this.otherProps;
    if (readOnly === undefined) readOnly = (this.mergeProps.mode === 'view');
    return (
      <AntInputNumber
        {...others}
        value={this.stringToNumber(value)}
        defaultValue={this.stringToNumber(defaultValue)}
        readOnly={readOnly}
        />
    );
  }

}
