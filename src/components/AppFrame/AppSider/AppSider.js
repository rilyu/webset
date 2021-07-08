// AppSider.js

import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from 'antd';
import ScrollView from '../../ScrollView/ScrollView';

import './AppSider.css';

export default class AppSider extends React.Component {

  static propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
    siderTrigger: PropTypes.element, // set null for no trigger
    siderFooter: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func, // (collapsed)
  };

  static defaultProps = {
    theme: 'light',
  };

  renderTrigger() {
    let {siderTrigger, collapsed, onCollapse} = this.props;
    if (siderTrigger !== undefined) return siderTrigger;
    return (
      <div className='ws-app-sider-trigger' onClick={() => onCollapse && onCollapse(!collapsed)}>
        <Icon className='icon' type={collapsed ? 'menu-unfold' : 'menu-fold'} />
      </div>
    );
  }

  renderChildren() {
    let {children} = this.props;
    if (!children && children !== 0) return null;
    return (
      <ScrollView className='ws-app-sider-scroll-view'>
        {children}
      </ScrollView>
    );
  }

  render() {
    let {theme, siderTrigger, siderFooter, collapsed, children} = this.props;
    if (!siderTrigger && !siderFooter && !children && children !== 0) return false;
    return (
      <div className={`ws-app-sider ${theme === 'dark' ? 'ws-app-sider-dark' : ''} ${collapsed ? 'ws-app-sider-collapsed' : ''}`}>
        {this.renderTrigger()}
        {this.renderChildren()}
        {siderFooter}
      </div>
    );
  }

}
