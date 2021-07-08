// AnimationFrame.js

import React from 'react';
import PropTypes from 'prop-types';

export default class AnimationFrame extends React.Component {

  static propTypes = {
    active: PropTypes.bool,
    onEvent: PropTypes.func, // (timestamp)
  };

  static defaultProps = {
    active: true,
  };

  componentDidMount() {
    this.props.active && this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.active !== prevProps.active) {
      this.props.active ? this.start() : this.stop();
    }
  }

  start() {
    let handleEvent = timestamp => {
      if (!this.props.active || !this.animationFrameId) return;
      this.props.onEvent && this.props.onEvent(timestamp);
      this.animationFrameId = window.requestAnimationFrame(timestamp => handleEvent(timestamp));
    };
    this.animationFrameId = window.requestAnimationFrame(timestamp => handleEvent(timestamp));
  }

  stop() {
    if (!this.animationFrameId) return;
    window.cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
  }

  render() {
    return false;
  }

}

(function() {
  if (window.requestAnimationFrame) return;

  window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
  window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelAnimationFrame;

  if (!window.requestAnimationFrame) {
    let lastTime = 0;
    window.requestAnimationFrame = (callback, element) => {
      let currTime = new Date().getTime();
      let timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      let id = window.setTimeout(() => callback(currTime + timeToCall), timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
    window.cancelAnimationFrame = id => clearTimeout(id);
  }
}());
