// Checkbox.js

import React from 'react';
import PropTypes from 'prop-types';

import {Checkbox as AntCheckbox} from 'antd';
import Field from '../Field/Field';

import './Checkbox.css';

export default class Checkbox extends Field {

  static propTypes = {
    ...Field.propTypes,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
    valueType: PropTypes.oneOf(['bool', 'string', 'number']),
    readOnly: PropTypes.bool,
  };

  static defaultProps = {
    ...Field.defaultProps,
    valueType: 'bool',
  };

  renderTitle() {
    let {titleStyle, titleMode} = this.mergeProps;
    if (titleMode === 'none') return null;
    return (
      <div style={titleStyle} className={`ws-field-title`} ref={v => this.titleElement = v} />
    );
  }

  renderDetail() {
    let {title, mode, required} = this.mergeProps;
    let {value, checked, valueType, readOnly, onChange, ...others} = this.otherProps;
    if (readOnly === undefined) readOnly = (mode === 'view');
    if (value === undefined) value = checked;
    let toChecked = v => (valueType === 'string' ? (typeof v === 'string' && v.toLowerCase() === 'true') : !!v);
    let toValue = v => {
      if (v === null || v === undefined || valueType === 'bool') return v;
      return (valueType === 'string' ? (v ? 'true' : 'false') : (v ? 1 : 0));
    };
    return (
      <AntCheckbox
        {...others}
        className={`ws-field-checkbox ${required ? 'ws-field-required' : ''}`}
        checked={toChecked(value)}
        onChange={e => !readOnly && onChange && onChange(toValue(e.target.checked))}
      >
        {title}
      </AntCheckbox>
    );
  }

  renderValueString(value) {
    return value ? '是' : '否';
  }

}
