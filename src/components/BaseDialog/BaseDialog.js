// BaseDialog.js

import React from 'react';
import PropTypes from 'prop-types';

import {Modal, Button, Spin, Icon} from 'antd';

import AppContext from '../AppContext/AppContext';
import AppProvider from '../AppContext/AppProvider';

import './BaseDialog.css';

export default class BaseDialog extends React.Component {

  static contextType = AppContext;

  static propTypes = {
    ...Modal.propTypes,
    mode: PropTypes.oneOf(['form', 'edit', 'view', 'confirm']), // 注意 form 没有 confirm
    fullMode: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]), // func: (dialog)，可调用 dialog.close 或其它函数，不需要 title 时传入 null
    footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]), // func: (dialog)，可调用 dialog.close 或其它函数，不需要 footer 时传入 null
    closeText: PropTypes.string, // okText/cancelText 在 Modal 中定义
    onOk: PropTypes.func, // async (dialog) ，返回 false 时不关闭对话框
    onCancel: PropTypes.func, // async (dialog) ，返回 false 时不关闭对话框，关闭按钮也使用 onCancel
  };

  static defaultProps = {
    ...Modal.defaultProps,
    closable: true,
    width: 520,
    maskClosable: true,
    okText: '确认',
    cancelText: '取消',

    mode: 'view',
    fullMode: false,
    closeText: '关闭'
  };

  static show(options) {
    let dialog, key;
    let renderElement = props => {
      return (
        <this.prototype.constructor
          {...props}
          afterClose={() => {
            dialog && dialog.state.closed && AppProvider.remove(key);
            props && props.afterClose && props.afterClose();
          }}
          ref={v => dialog = v}
          />
      );
    }
    key = AppProvider.add(renderElement(options));
    return {
      key,
      close: () => dialog && dialog.close(),
      update: props => AppProvider.update(key, renderElement(props)),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      closed: false,
      visible: true,
      loading: false, // 查询数据中，仅在派生类中设置，派生类可重写 renderLoading ，可用于查询按钮、Table等，勿用于关闭、确认等按钮
      submitting: false, // 提交数据中，可用于提交、确认按钮
      cancelling: false, // 取消操作中，可用于取消、关闭按钮
    };
  }

  close() {
    this.setState({closed: true, visible: false});
  }

  async onCancelClick() {
    if (this.state.cancelling) return;
    if (this.props.onCancel) {
      this.setState({cancelling: true});
      let result = await this.props.onCancel();
      this.setState({cancelling: false});
      if (result === false) return;
    }
    this.close();
  }

  async onOkClick() {
    if (this.state.submitting) return;
    if (this.props.onOk) {
      this.setState({submitting: true});
      let result = await this.props.onOk();
      this.setState({submitting: false});
      if (result === false) return;
    }
    this.close();
  }

  renderTitle() {
    let {title} = this.props;
    return (typeof title === 'function' ? title(this) : title);
  }

  renderFooter() {
    let {mode, footer, okText, okType, cancelText, closeText} = this.props;
    let {submitting, cancelling} = this.state;

    if (typeof footer === 'function') return footer(this);
    else if (footer !== undefined) return footer;

    if (mode === 'view') {
      return [
        <Button key='ok' type={okType} loading={cancelling} onClick={() => this.onCancelClick()}>{closeText}</Button>,
      ];
    } else {
      return [
        <Button key='cancel' disabled={cancelling} onClick={() => this.onCancelClick()}>{cancelText}</Button>,
        <Button key='ok' type={okType} loading={submitting} onClick={() => this.onOkClick()}>{okText}</Button>,
      ];
    }
  }

  renderContent() {
    return this.props.children;
  }

  renderLoading() {
    let {loading} = this.state;
    if (!loading) return null;
    return (
      <div className='ws-dialog-loading'>
        <Spin delay={1000} />
      </div>
    );
  }

  renderIcon() {
    if (this.props.mode !== 'confirm') return false;
    return <Icon type='question-circle' className='ws-dialog-confirm-icon' />;
  }

  render() {
    let {mode, fullMode, title, footer, okText, cancelText, closeText, onOk, onCancel, visible, wrapClassName, children, ...others} = this.props;
    return (
      <Modal
        visible={this.state.visible}
        title={this.renderTitle()}
        footer={this.renderFooter()}
        wrapClassName={`ws-dialog ${fullMode ? 'ws-dialog-full' : ''} ${wrapClassName || ''}`}
        onCancel={() => this.onCancelClick()}
        {...others}
      >
        <div className='ws-dialog-content-container'>
          {this.renderIcon()}
          {this.renderContent()}
          {this.renderLoading()}
        </div>
      </Modal>
    );
  }
}
