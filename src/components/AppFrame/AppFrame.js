// AppFrame.js

import React from 'react';
import PropTypes from 'prop-types';

import AppHeader from './AppHeader/AppHeader';
import AppSider from './AppSider/AppSider';
import AppTabs from './AppTabs/AppTabs';
import AppMenu from './AppMenu/AppMenu';

import './AppFrame.css';

export default class AppFrame extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    appLogo: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    appTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    appSubTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    menuTree: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]), // 注意文字要用 span 包裹，否则 inlineCollapsed 时无法隐藏
      children: PropTypes.array,
    })),
    menuTheme: PropTypes.oneOf(['light', 'dark']),
    menuPlace: PropTypes.oneOf(['sider', 'header']),
    headerTail: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    siderTrigger: PropTypes.element, // null for no trigger
    siderFooter: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    tabBar: PropTypes.oneOf(['none', 'hide', 'show']), // none-无(仅单页)  hide-隐藏(多页)  show-显示(多页)
    fullScreenAble: PropTypes.bool,
    fullScreenBar: PropTypes.oneOf(['auto', 'show', 'hide']),
  };

  static defaultProps = {
    menuTheme: 'dark',
    menuPlace: 'sider',
  };

  static Header = AppHeader;
  static Sider = AppSider;
  static Tabs = AppTabs;
  static Menu = AppMenu;

  constructor(props) {
    super(props);
    this.state = {
      activePath: null,
      collapsed: false,
    };
  }

  componentDidMount() {
    this.stateHandler = this.props.navigator.register('navigatorStateChange', ({activePath}) => this.setState({activePath}));
    let {activePath} = this.props.navigator.state;
    this.setState({activePath});
    if (window.location.hash) this.props.navigator.open(window.location.hash.substr(1));
  }

  componentWillUnmount() {
    this.stateHandler.unregister();
  }

  renderMenu() {
    let {navigator, menuTree, menuTheme, menuPlace} = this.props;
    let {activePath, collapsed} = this.state;
    return (
      <this.constructor.Menu
        menuTree={menuTree}
        theme={menuTheme}
        mode={menuPlace === 'header' ? 'horizontal' : 'inline'}
        inlineCollapsed={collapsed}
        selectedKey={activePath}
        onChange={selectedKey => navigator.routeTo(selectedKey)}
        />
    );
  }

  renderHeader() {
    let {appLogo, appTitle, appSubTitle, headerTail, menuPlace} = this.props;
    return (
      <this.constructor.Header
        appLogo={appLogo}
        appTitle={appTitle}
        appSubTitle={appSubTitle}
        headerTail={headerTail}
      >
        {menuPlace === 'header' && this.renderMenu()}
      </this.constructor.Header>
    );
  }

  renderSider() {
    let {menuTheme, menuPlace, siderTrigger, siderFooter} = this.props;
    let {collapsed} = this.state;
    return (
      <this.constructor.Sider
        theme={menuTheme}
        collapsed={collapsed}
        siderTrigger={siderTrigger}
        siderFooter={siderFooter}
        onCollapse={collapsed => this.setState({collapsed})}
      >
        {menuPlace === 'sider' && this.renderMenu()}
      </this.constructor.Sider>
    );
  }

  renderContent() {
    let {tabBar, fullScreenAble, fullScreenBar} = this.props;
    return <this.constructor.Tabs navigator={this.props.navigator} tabBar={tabBar} fullScreenAble={fullScreenAble} fullScreenBar={fullScreenBar} />;
  }

  render() {
    return (
      <div className='ws-app'>
        {this.renderHeader()}
        <div className='ws-app-content-container'>
          {this.renderSider()}
          {this.renderContent()}
        </div>
      </div>
    );
  }

}
