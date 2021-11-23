// CheckboxEnum.js

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Input as AntInput, Popover, Checkbox, Icon, Button} from 'antd';

import BaseEnum from './BaseEnum';

import './CheckboxEnum.css';

export default class CheckboxEnum extends BaseEnum {

  static propTypes = {
    ...BaseEnum.propTypes,
    dataSource: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.any, name: PropTypes.string})),
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      popoverVisible: false,
      inputWidth: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.dataSource !== prevProps.dataSource) {
      this.setState({data: this.props.dataSource});
    }
  }

  async fetchData() {
    return this.props.dataSource;
  }

  selectAll() {
    this.props.onChange && this.props.onChange((this.state.data || []).map(item => this.getId(item)));
  }

  selectNone() {
    this.props.onChange && this.props.onChange([]);
  }

  renderCheckboxItem(item, index) {
    let {value, onChange} = this.otherProps;
    let itemId = this.getId(item);
    let toggleCheck = e => {
      if (e.target.checked) value = [...(value || []), itemId];
      else value = value && value.filter(v => v !== itemId);
      onChange && onChange(value);
    };
    return (
      <Checkbox key={index} className='ws-checkbox-enum-popover-row' checked={!!value && value.indexOf(itemId) >= 0} onChange={toggleCheck}>
        {this.getName(item)}
      </Checkbox>
    );
  }

  renderPopoverContent() {
    if (!this.state.data || this.state.data.length === 0) {
      return (
        <div className='ws-checkbox-enum-popover-content' style={{minWidth: this.state.inputWidth || 'unset', textAlign: 'center'}}>
          暂无数据
        </div>
      );
    }
    return (
      <div>
        <div className='ws-checkbox-enum-popover-content' style={{minWidth: this.state.inputWidth || 'unset'}}>
          {this.state.data.map((item, index) => this.renderCheckboxItem(item, index))}
        </div>
        <div className='ws-checkbox-enum-popover-footer'>
          <Button type='link' size='small' onClick={() => this.selectAll()}>全选</Button>
          <Button type='link' size='small' onClick={() => this.selectNone()}>全不选</Button>
        </div>
      </div>
    );
  }

  renderInput() {
    let {className, value, valueType, readOnly, selectMode, pageSize, optionFilterProp, onChange, dataSource, ...others} = this.otherProps;
    let checkWidth = v => {
      let element = v && ReactDOM.findDOMNode(v);
      if (element && element.clientWidth !== this.state.inputWidth) this.setState({inputWidth: element.clientWidth});
    }
    return (
      <AntInput
        className={`ws-checkbox-enum-input ${className || ''}`}
        value={this.renderValueString(value)}
        readOnly={true}
        suffix={
          <span className={`ws-checkbox-enum-arrow ${this.state.popoverVisible ? 'ws-checkbox-enum-arrow-open' : ''}`}>
            <Icon type={this.state.loading ? 'loading' : 'down'} />
          </span>
        }
        {...others}
        ref={checkWidth}
        />
    );
  }

  renderDetail() {
    let {readOnly, disabled} = this.otherProps;
    if (readOnly === undefined) readOnly = (this.mergeProps.mode === 'view');
    if (readOnly || disabled) return this.renderInput();
    return (
      <Popover
        content={this.renderPopoverContent()}
        trigger='click'
        placement='bottomRight'
        overlayClassName='ws-checkbox-enum-popover'
        onVisibleChange={popoverVisible => this.setState({popoverVisible})}
      >
        {this.renderInput()}
      </Popover>
    );
  }

}

