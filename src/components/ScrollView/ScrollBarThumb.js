// ScrollBarThumb.js

import React from 'react';
import PropTypes from 'prop-types';

export default class ScrollBarThumb extends React.Component {

  static propTypes = {
    position: PropTypes.number,
    onHold: PropTypes.func,
    onRelease: PropTypes.func,
    onDraging: PropTypes.func, // (position, dx, dy)
  };

  constructor(props) {
    super(props);
    this.dragging = false;
    this.startPoint = null;
    this.startPosition = 0;
  }

  componentDidMount() {
    this.mouseMoveHandler = e => this.onMouseMove(e);
    this.mouseUpHandler = e => this.onMouseUp(e);
    window.addEventListener('mousemove', this.mouseMoveHandler);
    window.addEventListener('mouseup', this.mouseUpHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.mouseMoveHandler);
    window.removeEventListener('mouseup', this.mouseUpHandler);
  }

  onMouseDown(e) {
    if (e.button !== 0) return;
    let {screenX, screenY} = e;
    this.startPoint = {screenX, screenY};
    this.startPosition = this.props.position;
    this.dragging = true;
    this.props.onHold && this.props.onHold();
    this.props.onMouseDown && this.props.onMouseDown(e);
  }

  onMouseMove(e) {
    if (!this.dragging) return;
    let {screenX, screenY} = e;
    let dx = screenX - this.startPoint.screenX;
    let dy = screenY - this.startPoint.screenY;
    this.props.onDraging && this.props.onDraging(this.startPosition, dx, dy);
  }

  onMouseUp(e) {
    if (e.button !== 0 || !this.dragging) return;
    this.dragging = false;      
    this.props.onRelease && this.props.onRelease();
  }

  render() {
    let {position, onHold, onRelease, onDraging, onMouseDown, ...others} = this.props;
    return (
      <div onMouseDown={e => this.onMouseDown(e)} {...others} />
    );
  }

}
