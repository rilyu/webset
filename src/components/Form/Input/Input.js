// Input.js

import React from 'react';

import {Input as AntInput} from 'antd';

import Field from '../Field/Field';

import './Input.css';

export default class Input extends Field {

  renderInput(mode) {
    let {readOnly, onChange, ...others} = this.otherProps;
    if (readOnly === undefined) readOnly = (mode === 'view');
    return (
      <AntInput {...others} readOnly={readOnly} onChange={e => onChange && onChange(e.target.value)} />
    );
  }

  renderTextArea(mode) {
    let {readOnly, onChange, ...others} = this.otherProps;
    if (readOnly === undefined) readOnly = (mode === 'view');
    return (
      <AntInput.TextArea {...others} readOnly={readOnly} onChange={e => onChange && onChange(e.target.value)} />
    );
  }

  renderDetail() {
    let {mode, type} = this.mergeProps;
    return (type === 'textarea' ? this.renderTextArea(mode) : this.renderInput(mode));
  }

}
