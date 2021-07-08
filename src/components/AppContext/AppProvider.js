// AppProvider.js

import React from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';

let keyValue = 0;

export default class AppProvider extends React.Component {

  static context = null; // 在渲染时设置值，使得可以在静态类中使用

  static createEvent(name, detail) {
    let e;
    if ('CustomEvent' in window && typeof window.CustomEvent === 'function') {
      e = new CustomEvent(name, {detail});
    } else {
      e = document.createEvent('CustomEvent');
      e.initCustomEvent(name, false, false, detail);
    }
    return e;
  }

  static sendEvent(name, detail) {
    let e = this.createEvent(name, detail);
    window.dispatchEvent(e);
  }

  static add(element) {
    let key = ++keyValue;
    this.sendEvent('addOverlay', {key, element});
    return key;
  }

  static remove(key) {
    this.sendEvent('removeOverlay', {key});
  }

  static removeAll() {
    this.sendEvent('removeAllOverlay', {});
  }

  static update(key, element) {
    this.sendEvent('updateOverlay', {key, element});
  }

  static propTypes = {
    value: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      elements: [],
    };
  }

  componentDidMount() {
    this.addOverlayHandler = e => this.add(e.detail);
    this.removeOverlayHandler = e => this.remove(e.detail);
    this.removeAllOverlayHandler = e => this.removeAll(e.detail);
    this.updateOverlayHandler = e => this.update(e.detail);
    window.addEventListener("addOverlay", this.addOverlayHandler);
    window.addEventListener("removeOverlay", this.removeOverlayHandler);
    window.addEventListener("removeAllOverlay", this.removeAllOverlayHandler);
    window.addEventListener("updateOverlay", this.updateOverlayHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("addOverlay", this.addOverlayHandler);
    window.removeEventListener("removeOverlay", this.removeOverlayHandler);
    window.removeEventListener("removeAllOverlay", this.removeAllOverlayHandler);
    window.removeEventListener("updateOverlay", this.updateOverlayHandler);
  }

  add(e) {
    let {elements} = this.state;
    elements.push(e);
    this.setState({elements});
  }

  remove(e) {
    let {elements} = this.state;
    for (let i = elements.length - 1; i >= 0; --i) {
      if (elements[i].key === e.key) {
        elements.splice(i, 1);
        break;
      }
    }
    this.setState({elements});
  }

  removeAll() {
    this.setState({elements: []});
  }

  update(e) {
    let {elements} = this.state;
    for (let i = elements.length - 1; i >= 0; --i) {
      if (elements[i].key === e.key) {
        elements[i] = e;
        break;
      }
    }
    this.setState({elements});
  }

  renderTopViews() {
    let {elements} = this.state;
    let topViews = elements.map((item, index) =>
      React.cloneElement(item.element, {key: 'topView' + item.key})
    );
    return topViews;
  }

  render() {
    let {children, value, ...others} = this.props;
    this.constructor.context = value;
    return (
      <AppContext.Provider value={value} {...others}>
        {children}
        {this.renderTopViews()}
      </AppContext.Provider>
    );
  }

}
