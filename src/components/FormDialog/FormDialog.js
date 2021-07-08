// FormDialog.js

import React from 'react';

import {Modal} from 'antd';

import Form from '../Form/Form';
import BaseDialog from '../BaseDialog/BaseDialog';

export default class FormDialog extends BaseDialog {

  static defaultProps = {
    ...BaseDialog.defaultProps,
    mode: 'form',
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      verify: false,
      modified: false,
      data: {},
    };
  }

  //派生类必须重写此函数，成功返回 true
  async postData() {
    console.error(this.constructor.name + ' 未重写 postData() 函数');
  }

  checkValue() {
    if (this.props.mode !== 'form' && !this.form) return true;
    if (!this.form) {
      console.error(`this.form 未定义, 请检查 ${this.constructor.name}.renderContent() 函数 Form 组件声明`);
      return false;
    }
    if (this.form.hasError) {
      this.setState({verify: true});
      return false;
    }
    return true;
  }

  async onCancelClick() {
    if (!this.state.modified) return super.onCancelClick();
    Modal.confirm({
      title: '关闭编辑窗口',
      content: '是否放弃当前修改？',
      onOk: () => super.onCancelClick(),
      maskClosable: true,
      okText: '是',
      cancelText: '否',
    });
  }

  async onOkClick() {
    if (!this.checkValue()) return;
    this.setState({submitting: true});
    let success = await this.postData();
    this.setState({submitting: false}, () => success && super.onOkClick());
  }

  updateData(data, callback) {
    this.setState({modified: true, data: {...this.state.data, ...data}}, callback);
  }

  renderContent() {
    return (
      <Form mode={this.props.mode} fieldProps={{verify: this.state.verify, span: 24}} ref={v => this.form = v}>
        renderFields here
      </Form>
    );
  }

}
