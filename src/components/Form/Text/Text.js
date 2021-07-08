// Text.js

import React from 'react';
import PropTypes from 'prop-types';

import {Tooltip} from 'antd';

import Field from '../Field/Field';

import './Text.css';

export default class Text extends Field {

  static propTypes = {
    ...Field.propTypes,
    underline: PropTypes.bool,
    collapse: PropTypes.bool,
  };

  static defaultProps = {
    ...Field.defaultProps,
    underline: false,
    collapse: false,
  };

  get fieldClassName() {
    return 'ws-field-text';
  }

  renderText() {
    let {value, underline} = this.mergeProps;
    return (
      <p className={`ws-field-detail ${underline ? 'ws-field-text-underline' : ''}`}>{value}</p>
    );
  }

  renderCollapseText() {
    let {value, underline} = this.mergeProps;
    return (
      <Tooltip title={value}>
        <p className={`ws-field-detail ws-field-text-collapse ${underline ? 'ws-field-text-underline' : ''}`}>{value}</p>
      </Tooltip>
    );
  }

  renderDetail() {
    let {collapse} = this.mergeProps;
    return (collapse ? this.renderCollapseText() : this.renderText());
  }

}
