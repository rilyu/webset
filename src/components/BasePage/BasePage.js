// BasePage.js

import React from 'react';
import PropTypes from 'prop-types';

import {Modal} from 'antd';

import AppContext from '../AppContext/AppContext';

import './BasePage.css';

export default class BasePage extends React.Component {

  static contextType = AppContext;

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };

  confirm({content, title='确认', maskClosable=true, destroyOnClose=true, onOk, onCancel, ...others}) {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        ...others,
        title,
        content,
        maskClosable,
        destroyOnClose,
        onOk: async e => {
          onOk && await onOk(e);
          resolve(true);
        },
        onCancel: async e => {
          onCancel && await onCancel(e);
          resolve(false);
        },
      });
    });
  }

  render() {
    // 空白页内容，将在派生类中覆盖
    return (
      <div className='ws-page'>
        {this.props.children || <p className='ws-page-empty'>建设中...</p>}
      </div>
    );
  }

}
