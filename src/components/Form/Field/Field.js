// Field.js

import React from 'react';
import PropTypes from 'prop-types';

import {Col} from 'antd';

import AppContext from '../../AppContext/AppContext';
import FormContext from '../FormContext';

import './Field.css';

export default class Field extends React.Component {

  static contextType = AppContext;

  // *** 在此定义的全部属性均不会传递给 detail 组件
  static colPropKeySet = ['span', 'order', 'offset', 'push', 'pull', 'className', 'children', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'].reduce((result, item) => Object.assign(result, {[item]: true}), {});
  static fieldPropTypes = {
    mode: PropTypes.oneOf(['form', 'edit', 'view', 'string']), // 默认取 form.mode ， form.mode 未定义则默认为 edit
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    titleStyle: PropTypes.object,
    titleMode: PropTypes.oneOf(['none', 'left', 'leftColon', 'top', 'topColon']),
    tail: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
    required: PropTypes.bool,
    verify: PropTypes.bool, //verify: 是否校验，为true调用verifier校验，不设置时取context.defaultVerify值，默认不设置
    verifier: PropTypes.func, //verifier: 校验器，函数参数为(field)，返回错误字符串，不设置时取context.defaultVerifier值
    // value 、 defaultValue 也是公共属性，但需要放在 otherProps 中，因此不能在此定义
  };
  static propTypes = {
    ...Col.propTypes,
    ...this.fieldPropTypes,
  };

  // *** 默认属性应在 initProps 定义以使得可以合并 Form.fieldProps
  static defaultProps = {
    ...Col.defaultProps,
  };

  constructor(props) {
    super(props);
    this.formContext = {};
  }

  componentDidMount() {
    this.formContext.form && this.formContext.form.register(this);
  }

  componentWillUnmount() {
    this.formContext.form && this.formContext.form.unregister(this);
  }

  buildProps() {
    this.initProps = {
      span: 6, // Col 划分为 24 格，默认占 1/4
      titleMode: 'leftColon',
      required: false,
    };

    let {mode, fieldProps} = this.formContext;
    let titleStyle = {...this.initProps.titleStyle, ...(fieldProps && fieldProps.titleStyle), ...this.props.titleStyle};
    this.mergeProps = {...this.initProps, mode, ...fieldProps, ...this.props, titleStyle};
    if (!this.mergeProps.mode) this.mergeProps.mode = 'edit';

    this.colProps = {};
    this.otherProps = {};
    for (let key in this.mergeProps) {
      if (key === 'className') this.otherProps[key] = this.mergeProps[key]; // className属性用于detail
      else if (this.constructor.colPropKeySet[key]) this.colProps[key] = this.mergeProps[key];
      else if (this.constructor.fieldPropTypes[key] === undefined) this.otherProps[key] = this.mergeProps[key];
    }
  }

  get error() {
    if (this.props.verifier) return this.props.verifier(this);
    if (this.formContext.fieldProps && this.formContext.fieldProps.verifier) return this.formContext.fieldProps.verifier(this);
    else return this.defaultVerifier(this);
  }

  get fieldClassName() {
    return '';
  }

  defaultVerifier(field) {
    let {required, value, title} = field.props || {};
    let getElementText = element => {
      if (!element) return '';
      if (typeof element === 'string') return element;
      let children = (element.props.children instanceof Array ? element.props.children : [element.props.children]).filter(Boolean);
      return children.map(item => getElementText(item)).join('');
    };
    if (required && (value === null || value === undefined || value === '' || (value instanceof Array && value.length === 0))) {
      return getElementText(title) + '不能为空';
    }
    return null;
  }

  renderTitle() {
    let {title, titleStyle, titleMode, required} = this.mergeProps;
    if (titleMode === 'none') return null;
    return (
      <div style={titleStyle} className={`ws-field-title ${required ? 'ws-field-required' : ''}`} ref={v => this.titleElement = v}>
        {title}{`${titleMode === 'leftColon' || titleMode === 'topColon' ? ':' : ''}`}
      </div>
    );
  }

  renderDetail() {
    let {value, children} = this.mergeProps;
    if (children) return children;
    return (
      <div className={`ws-field-detail`}>{this.renderValueString(value)}</div>
    );
  }

  renderValueString(value) {
    return (value ? `${value}` : '');
  }

  renderTail() {
    if (!this.mergeProps.tail) return null;
    return <div className='ws-field-tail'>{this.mergeProps.tail}</div>;
  }

  renderField(formContext) {
    this.formContext = formContext || {};
    this.buildProps();

    let {mode, titleMode, verify, value, defaultValue} = this.mergeProps;
    if (mode === 'string') return this.renderValueString(value || value === 0 || value === false ? value : defaultValue);

    let error = (verify && mode === 'form' ? this.error : null);
    let modeClassName = `ws-field-${mode}`;
    let titleModeClassName = (titleMode === 'left' || titleMode === 'leftColon' ? 'ws-field-row' : '');
    let errorClassName = (error ? 'ws-field-has-error' : '');
    return (
      <Col {...this.colProps} className={`ws-field ${this.fieldClassName} ${modeClassName} ${titleModeClassName} ${errorClassName}`}>
        {this.renderTitle()}
        <div className='ws-field-detail-container'>
          <div className='ws-field-detail-row'>
            {this.renderDetail()}
            {this.renderTail()}
          </div>
          <div className='ws-field-error'>{error}</div>
        </div>
      </Col>
    );
  }

  render() {
    return (
      <FormContext.Consumer>
        {formContext => this.renderField(formContext)}
      </FormContext.Consumer>
    );
  }
}
