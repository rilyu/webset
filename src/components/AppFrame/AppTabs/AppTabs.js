// AppTabs.js

import React from 'react';
import PropTypes from 'prop-types';

import {Dropdown, Menu, Icon} from 'antd';
import FlexTabs from '../../FlexTabs/FlexTabs';
import ScrollView from '../../ScrollView/ScrollView';

import './AppTabs.css';

export default class AppTabs extends React.Component {

  static propTypes = {
    type: PropTypes.oneOf(['line', 'card']),
    navigator: PropTypes.object.isRequired,
  };

  static defaultProps = {
    type: 'card',
  };

  renderTab(key) {
    let {params: {title, icon}, options: {noClose}} = this.props.navigator.state.pageSet[key];

    let extraMenuClick = menuKey => {
      switch (menuKey) {
        case 'close': this.props.navigator.close(key); break;
        case 'closeAll': this.props.navigator.closeAll(); break;
        case 'closeOthers': this.props.navigator.closeOthers(key); break;
        case 'closeLeft': this.props.navigator.closeLeft(key); break;
        case 'closeRight': this.props.navigator.closeRight(key); break;
        default: break;
      }
    };
    let overlay = (
      <Menu onClick={item => extraMenuClick(item.key)}>
        <Menu.Item key='close'>关闭</Menu.Item>
        <Menu.Item key='closeOthers'>关闭其它</Menu.Item>
        <Menu.Item key='closeRight'>关闭右边</Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={overlay} trigger={['contextMenu']}>
        <span className='ws-app-tabs-title'>
          {icon ? (typeof icon === 'string' ? <Icon type={icon} /> : icon) : null}
          {title}
          {!noClose && <Icon type='close' onClick={e => {this.props.navigator.close(key); e.stopPropagation();}} />}
        </span>
      </Dropdown>
    );
  }

  renderPane(key) {
    let page = this.props.navigator.state.pageSet[key];
    return (
      <FlexTabs.TabPane key={key} tab={this.renderTab(key)} closable={!page.options.noClose}>
        <ScrollView className='ws-app-tabs-scroll-view'>
          {page.render()}
        </ScrollView>
      </FlexTabs.TabPane>
    );
  }

  render() {
    let {navigator, activeKey, type, className, children, onChange, ...others} = this.props;
    let {activePath, pageSet} = navigator.state;
    return (
      <FlexTabs
        className={`ws-app-tabs ${pageSet[activePath] && pageSet[activePath].options.grayTab ? 'ws-app-tabs-gray' : ''} ${className || ''}`}
        activeKey={activePath}
        onChange={activeKey => navigator.switchTo(activeKey)}
        type={type}
        {...others}
      >
        {Object.keys(pageSet).map(key => this.renderPane(key))}
      </FlexTabs>
    );
  }

}
