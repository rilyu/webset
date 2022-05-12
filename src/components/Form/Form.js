// Form.js

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import FormContext from './FormContext';
import Row from './Row/Row';
import Field from './Field/Field';
import Text from './Text/Text';
import Input from './Input/Input';
import InputNumber from './InputNumber/InputNumber';
import Select from './Select/Select';
import BaseEnum from './Enum/BaseEnum';
import BaseTree from './Enum/BaseTree';
import Enum from './Enum/Enum';
import CheckboxEnum from './Enum/CheckboxEnum';
import TimePicker from './TimePicker/TimePicker';
import DatePicker from './DatePicker/DatePicker';
import Checkbox from './Checkbox/Checkbox';

import './Form.css';

export default class Form extends React.Component {

  static propTypes = {
    mode: PropTypes.oneOf(['form', 'edit', 'view', 'string']), // form:输入且校验值  edit:输入但不校验值  view:仅显示  string:仅返回值字符串
    fieldProps: PropTypes.object, // 作为 field 的默认属性, Field 属性优先级: get initProps() < Form.props.fieldProps < static defaultProps < props
  };

  static defaultProps = {
    mode: 'form',
  };

  static Row = Row;
  static Field = Field;
  static Text = Text;
  static Input = Input;
  static InputNumber = InputNumber;
  static Select = Select;
  static BaseEnum = BaseEnum;
  static BaseTree = BaseTree;
  static Enum = Enum;
  static CheckboxEnum = CheckboxEnum;
  static TimePicker = TimePicker;
  static DatePicker = DatePicker;
  static Checkbox = Checkbox;

  constructor(props) {
    super(props);
    this.fieldList = [];
    this.titleWidth = 70;
  }

  register(field) {
    this.fieldList.indexOf(field) < 0 && this.fieldList.push(field);
    if (field && field.titleElement) {
      let domElement = ReactDOM.findDOMNode(field.titleElement);
      if (domElement) {
        // 这种方式在父元素存在缩放时不准确 let {width} = domElement.getBoundingClientRect();
        let width = parseFloat(window.getComputedStyle(domElement).width);
        if (width > this.titleWidth) {
          this.titleWidth = Math.ceil(width);
          this.forceUpdate();
        }
      }
    }
  }

  unregister(field) {
    let index = this.fieldList.indexOf(field);
    if (index >= 0) this.fieldList.splice(index, 1);
  }

  get hasError() {
    for (let field of this.fieldList) {
      if (field.error) return true;
    }
    return false;
  }

  render() {
    let {className, mode, fieldProps, value, ...others} = this.props;
    fieldProps = {...fieldProps};
    fieldProps.titleStyle = {minWidth: this.titleWidth, ...fieldProps.titleStyle};
    return (
      <FormContext.Provider value={{form: this, mode, fieldProps}}>
        <div className={`ws-form ${className || ''}`} {...others} />
      </FormContext.Provider>
    );
  }

}

