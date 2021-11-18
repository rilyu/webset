// AppTabs.js

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {Dropdown, Menu, Icon, Button} from 'antd';
import FlexTabs from '../../FlexTabs/FlexTabs';
import ScrollView from '../../ScrollView/ScrollView';

import './AppTabs.css';

export default class AppTabs extends React.Component {

  static propTypes = {
    type: PropTypes.oneOf(['line', 'card']),
    navigator: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool,
    fullScreenAble: PropTypes.bool,
    fullScreenBar: PropTypes.oneOf(['auto', 'show', 'hide']),
    onFullScreen: PropTypes.func, // (fullScreen)
  };

  static defaultProps = {
    type: 'card',
    fullScreenAble: false,
    fullScreenBar: 'show',
  };

  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false,
      hideBar: false,
    };
  }

  componentDidMount() {
    this.mouseMoveHandler = e => this.onMouseMove(e);
    this.mouseMoveHandler = window.addEventListener('mousemove', this.mouseMoveHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  get fullScreen() {
    return this.props.fullScreen === undefined ? this.state.fullScreen : this.props.fullScreen;
  }

  onMouseMove(e) {
    if (!this.fullScreen || this.props.fullScreenBar !== 'auto') return;
    let {clientX, clientY} = e;
    let {left, top, right} = this.flexTabs ? ReactDOM.findDOMNode(this.flexTabs).getBoundingClientRect() : {left: 0, top: 0, right: 0};

    if (this.delayShowBarTimer) clearTimeout(this.delayShowBarTimer);
    if (this.delayHideBarTimer) clearTimeout(this.delayHideBarTimer);
    this.delayShowBarTimer = null;
    this.delayHideBarTimer = null;
    if (this.state.hideBar) {
      if (clientX >= left && clientX <= right && clientY >= top && clientY <= top + 12) {
        this.delayShowBarTimer = setTimeout(() => this.setState({hideBar: false}), 500);
      }
    } else {
      if (clientX < left || clientX > right || clientY < top || clientY > top + 37) {
        this.delayHideBarTimer = setTimeout(() => this.setState({hideBar: true}), 100);
      }
    }
  }

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

  renderTabBarExtraContent() {
    let {fullScreenAble, fullScreenBar, tabBarExtraContent, onFullScreen} = this.props;
    if (!fullScreenAble) return tabBarExtraContent;

    let fullScreen = this.fullScreen;
    let onClick = () => {
      fullScreen = !fullScreen;
      this.setState({fullScreen, hideBar: fullScreenBar === 'hide'}, () => onFullScreen && onFullScreen(fullScreen));
      if (fullScreen && fullScreenBar === 'auto') setTimeout(() => this.setState({hideBar: true}), 500);
    };
    return (
      <React.Fragment>
        {tabBarExtraContent}
        <Button type='link' size='small' icon={fullScreen ? 'switcher' : 'border'} onClick={onClick}>
          {fullScreen ? '还原' : '全屏'}
        </Button>
      </React.Fragment>
    );
  }

  render() {
    let {navigator, fullScreenAble, fullScreenBar, activeKey, type, tabBarExtraContent, className, children, onChange, ...others} = this.props;
    let {hideBar} = this.state;
    let {activePath, pageSet} = navigator.state;
    let pageSetClassName = pageSet[activePath] && pageSet[activePath].options.grayTab ? 'ws-app-tabs-gray' : '';
    let fullScreenClassName = `${this.fullScreen ? 'ws-full-screen' : ''} ${fullScreenBar === 'show' ? '' : 'ws-app-tabs-bar-auto'} ${fullScreenBar === 'hide' || hideBar ? 'ws-app-tabs-bar-hide' : ''}`;
    return (
      <FlexTabs
        className={`ws-app-tabs ${pageSetClassName} ${fullScreenClassName} ${className || ''}`}
        activeKey={activePath}
        type={type}
        tabBarExtraContent={this.renderTabBarExtraContent()}
        onChange={activeKey => navigator.switchTo(activeKey)}
        {...others}
        ref={v => this.flexTabs = v}
      >
        {Object.keys(pageSet).map(key => this.renderPane(key))}
      </FlexTabs>
    );
  }

}
