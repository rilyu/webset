// ScrollBar.js

import React from 'react';
import PropTypes from 'prop-types';

import smoothscroll from 'smoothscroll-polyfill';

import AnimationFrame from './AnimationFrame';
import ScrollBarThumb from './ScrollBarThumb';

import './ScrollBar.css';

smoothscroll.polyfill();

export default class ScrollBar extends React.Component {

  static propTypes = {
    visible: PropTypes.oneOf(['hover', 'auto', 'visible', 'hidden']),
    position: PropTypes.oneOf(['sticky', 'fixed']),
  };

  static defaultProps = {
    visible: 'hover',
    position: 'sticky',
  };

  constructor(props) {
    super(props);
    this.state = {
      container: null,
      thumbDraging: false,
    };
    this.parentNodeScrollHandler = e => this.forceUpdate();
  }

  componentDidMount() {
    this.timer = setInterval(() => this.checkLayout(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.removeEventListener();
  }

  get commonClassName() {
    return `ws-scrollbar ${this.props.visible === 'hover' ? 'ws-scrollbar-hover' : ''} ${this.state.thumbDraging ? 'ws-scrollbar-draging-' + this.state.thumbDraging : ''}`;
  }

  get stickyStyle() {
    let {paddingRight=0, paddingBottom=0} = (this.state.container ? window.getComputedStyle(this.state.container.parentNode) : {});
    return {position: 'sticky', left: '100%', top: '100%', transform: `translate(${paddingRight}, ${paddingBottom})`};
  }

  get fixedStyle() {
    let {left=0, top=0} = (this.state.container ? this.state.container.parentNode.getBoundingClientRect() : {});
    let {clientLeft=0, clientTop=0, clientWidth=0, clientHeight=0} = (this.state.container ? this.state.container.parentNode : {});
    return {position: 'fixed', left: left + clientLeft + clientWidth, top: top + clientTop + clientHeight};
  }

  addEventListener() {
    this.state.container && this.state.container.parentNode.addEventListener('scroll', this.parentNodeScrollHandler);
  }

  removeEventListener() {
    this.state.container && this.state.container.parentNode.removeEventListener('scroll', this.parentNodeScrollHandler);
  }

  changeContainer(container) {
    if (!container || this.state.container === container) return;
    this.removeEventListener();
    this.setState({container}, () => this.addEventListener());
  }

  checkLayout() {
    if (!this.state.container) return;
    let {clientWidth, clientHeight, scrollWidth, scrollHeight} = this.state.container.parentNode;
    let {left, top} = this.state.container.parentNode.getBoundingClientRect();
    if (!this.prevLayout
      || clientWidth !== this.prevLayout.clientWidth || clientHeight !== this.prevLayout.clientHeight
      || scrollWidth !== this.prevLayout.scrollWidth || scrollHeight !== this.prevLayout.scrollHeight
      || left !== this.prevLayout.left || top !== this.prevLayout.top) {
      this.prevLayout = {clientWidth, clientHeight, scrollWidth, scrollHeight, left, top};
      this.forceUpdate();
    }
  }

  scrollTo(left, top, smooth) {
    let {container} = this.state;
    if (!container) return;
    if (container.parentNode.scrollTo && smooth) {
      container.parentNode.scrollTo({left, top, behavior: 'smooth'});
    } else {
      container.parentNode.scrollLeft = left;
      container.parentNode.scrollTop = top;
    }
  }

  renderHorizontal(showCorner) {
    let {clientWidth, scrollWidth, scrollLeft, scrollTop} = this.state.container.parentNode;
    let trackLength = clientWidth || 1;
    let scrollTo = (position, smooth) => {
      position = Math.min(Math.max(position, 0), scrollWidth - clientWidth);
      this.scrollTo(position, scrollTop, smooth);
    };
    return (
      <div className={`${this.commonClassName} ${showCorner ? 'ws-scrollbar-has-corner' : ''} ws-scrollbar-horizontal`} style={{left: -clientWidth}}>
        <div className='ws-scrollbar-track' ref={v => v && (trackLength = (v.getBoundingClientRect().width || 1))}>
          <div
            className='ws-scrollbar-track-piece'
            style={{width: scrollLeft / scrollWidth * 100 + '%'}}
            onClick={() => scrollTo(scrollLeft - clientWidth, true)}
            />
          <ScrollBarThumb
            className='ws-scrollbar-thumb'
            style={{width: clientWidth / scrollWidth * 100 + '%'}}
            position={scrollLeft}
            onHold={() => this.setState({thumbDraging: 'horizontal'})}
            onRelease={() => this.setState({thumbDraging: false})}
            onDraging={(position, dx, dy) => scrollTo(position + dx * scrollWidth / trackLength, false)}
            />
          <div
            className='ws-scrollbar-track-piece'
            style={{width: (scrollWidth - clientWidth - scrollLeft) / scrollWidth * 100 + '%'}}
            onClick={() => scrollTo(scrollLeft + clientWidth, true)}
            />
        </div>
      </div>
    );
  }

  renderVertical(showCorner) {
    let {clientHeight, scrollHeight, scrollTop, scrollLeft} = this.state.container.parentNode;
    let trackLength = clientHeight || 1;
    let scrollTo = (position, smooth) => {
      position = Math.min(Math.max(position, 0), scrollHeight - clientHeight);
      this.scrollTo(scrollLeft, position, smooth);
    };
    return (
      <div className={`${this.commonClassName} ${showCorner ? 'ws-scrollbar-has-corner' : ''} ws-scrollbar-vertical`} style={{top: -clientHeight}}>
        <div className='ws-scrollbar-track' ref={v => v && (trackLength = (v.getBoundingClientRect().height || 1))}>
          <div
            className='ws-scrollbar-track-piece'
            style={{height: scrollTop / scrollHeight * 100 + '%'}}
            onClick={() => scrollTo(scrollTop - clientHeight, true)}
            />
          <ScrollBarThumb
            className='ws-scrollbar-thumb'
            style={{height: clientHeight / scrollHeight * 100 + '%'}}
            position={scrollTop}
            onHold={() => this.setState({thumbDraging: 'vertical'})}
            onRelease={() => this.setState({thumbDraging: false})}
            onDraging={(position, dx, dy) => scrollTo(position + dy * scrollHeight / trackLength, false)}
            />
          <div
            className='ws-scrollbar-track-piece'
            style={{height: (scrollHeight - clientHeight - scrollTop) / scrollHeight * 100 + '%'}}
            onClick={() => scrollTo(scrollTop + clientHeight, true)}
            />
        </div>
      </div>
    );
  }

  renderCorner() {
    return <div className={`${this.commonClassName} ws-scrollbar-corner`} />;
  }

  renderScrollBar() {
    let {visible} = this.props;
    if (!this.state.container) return false;

    let {clientWidth, clientHeight, scrollWidth, scrollHeight} = this.state.container.parentNode;
    let {overflowX, overflowY} = window.getComputedStyle(this.state.container.parentNode);

    let showHorizontal = visible === 'visible' || overflowX === 'scroll' || (overflowX === 'auto' && scrollWidth > clientWidth);
    let showVertical = visible === 'visible' || overflowY === 'scroll' || (overflowY === 'auto' && scrollHeight > clientHeight);
    let showCorner = showHorizontal && showVertical;
    if (!showHorizontal && !showVertical) return false;

    return (
      <React.Fragment>
        {showHorizontal && this.renderHorizontal(showCorner)}
        {showVertical && this.renderVertical(showCorner)}
        {showCorner && this.renderCorner()}
      </React.Fragment>
    );
  }

  render() {
    let {visible, position} = this.props;
    if (visible === 'hidden') return false;
    return (
      <div className='ws-scrollbar-container' style={position === 'fixed' ? this.fixedStyle : this.stickyStyle} ref={v => this.changeContainer(v)}>
        {this.renderScrollBar()}
        {position === 'fixed' && <AnimationFrame onEvent={() => this.checkLayout()} />}
      </div>
    );
  }

}

