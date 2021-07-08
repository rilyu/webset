// ContextMenu.js

import React from 'react';
import PropTypes from 'prop-types';

import {Menu, Dropdown, Icon} from 'antd';
import AppProvider from '../AppContext/AppProvider';

export default class ContextMenu extends React.Component {

  static propTypes = {
    ...Dropdown.propTypes,
    menuData: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      disabled: PropTypes.bool,
      hidden: PropTypes.bool,
      onClick: PropTypes.func,
      children: PropTypes.array,
    })),
  };

  static defaultProps = {
    ...Dropdown.defaultProps,
    trigger: ['contextMenu'],
  };

  static show(left, top, options) {
    let renderElement = props => {
      return (
        <this.prototype.constructor
          {...props}
          defaultVisible={true}
          onVisibleChange={visible => {
            props && props.onVisibleChange && props.onVisibleChange(visible);
            !visible && AppProvider.remove(result.key);
          }}
        >
          <div style={{position: 'fixed', width: 0, height: 0, left, top}} />
        </this.prototype.constructor>
      );
    };
    let key = AppProvider.add(renderElement(options));
    let result = {
      key,
      close: () => AppProvider.remove(key),
      update: props => AppProvider.update(key, renderElement(props)),
    };
    return result;
  }

  constructor(props) {
    super(props);
    this.state = {
      menuData: props.menuData,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.menuData !== prevProps.menuData) {
      this.setState({menuData: this.props.menuData});
    }
  }

  renderMenuItem(item, index) {
    let {key, title, icon, disabled, hidden, onClick, children} = item;
    if (hidden) return null;
    if (title === '---') return <Menu.Divider key={index} />;

    title = <span>{typeof icon === 'string' ? <Icon type={icon} /> : icon}<span>{title}</span></span>;
    if (!children || children.length === 0) {
      return <Menu.Item key={key} disabled={disabled} onClick={onClick}>{title}</Menu.Item>;
    }
    return (
      <Menu.SubMenu key={key} title={title} disabled={disabled}>
        {children.map((item, index) => this.renderMenuItem(item, index))}
      </Menu.SubMenu>
    );
  }

  renderMenu() {
    let {menuData} = this.state;
    if (!menuData) return this.props.overlay;
    return (
      <Menu>
        {menuData.map((item, index) => this.renderMenuItem(item, index))}
      </Menu>
    );
  }

  render() {
    let {menuData, overlay, ...others} = this.props;
    return (
      <Dropdown overlay={this.renderMenu()} {...others} />
    );
  }
}
