// AppMenu.js

import React from 'react';
import PropTypes from 'prop-types';

import {Menu} from 'antd';

export default class AppMenu extends React.Component {

  static propTypes = {
    menuTree: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]), // 注意文字要用 span 包裹，否则 inlineCollapsed 时无法隐藏
      children: PropTypes.array,
    })),
    theme: PropTypes.string,
    mode: PropTypes.oneOf(['vertical', 'horizontal', 'inline']),
    inlineCollapsed: PropTypes.bool,
    selectedKey: PropTypes.string,
    onChange: PropTypes.func, //(selectedKey)
  };

  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
      inlineOpenKeys: [],
    };
  }

  renderItem(item, index) {
    let {key, title, children} = item;
    if (!children || children.length === 0) return <Menu.Item key={key}>{title}</Menu.Item>;
    return (
      <Menu.SubMenu key={key} title={title}>
        {children.map((item, index) => this.renderItem(item, index))}
      </Menu.SubMenu>
    );
  }

  render() {
    let {menuTree, theme, mode, inlineCollapsed, selectedKey, onChange, className, ...others} = this.props;
    let {openKeys, inlineOpenKeys} = this.state;
    return (
      <Menu
        {...others}
        {...(mode === 'inline' ? {inlineCollapsed} : {})}
        className={`ws-app-menu ${className || ''}`}
        theme={theme}
        mode={mode}
        selectedKeys={[selectedKey]}
        openKeys={mode === 'inline' ? inlineOpenKeys : openKeys}
        onSelect={item => onChange && onChange(item.selectedKeys.length > 0 ? item.selectedKeys[0] : null)}
        onOpenChange={openKeys => mode === 'inline' ? this.setState({inlineOpenKeys: openKeys}) : this.setState({openKeys})}
      >
        {menuTree && menuTree.map((item, index) => this.renderItem(item, index))}
      </Menu>
    );
  }

}
