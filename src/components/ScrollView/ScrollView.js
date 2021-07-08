// ScrollView.js

import React from 'react';
import PropTypes from 'prop-types';

import ScrollBar from './ScrollBar';

import './ScrollView.css';

export default class ScrollView extends React.Component {

  static propTypes = {
    scrollBarVisible: PropTypes.oneOf(['hover', 'auto', 'visible', 'hidden']),
    scrollBarPosition: PropTypes.oneOf([
      'auto',   // use sticky if supports, otherwise fixed
      'sticky', // doesn't support IE
      'fixed',  // doesn't work when using transform in chrome
    ]),
  };

  static defaultProps = {
    scrollBarVisible: 'hover',
    scrollBarPosition: 'auto',
  };

  static ScrollBar = ScrollBar;

  render() {
    let {className, scrollBarVisible, scrollBarPosition, children, ...others} = this.props;
    if (scrollBarPosition !== 'sticky' && scrollBarPosition !== 'fixed') {
      scrollBarPosition = (window.CSS && window.CSS.supports && window.CSS.supports('position', 'sticky') ? 'sticky' : 'fixed');
    }
    return (
      <div className={`ws-scroll-view ${className || ''}`} {...others}>
        {scrollBarPosition === 'sticky' && <ScrollBar visible={scrollBarVisible} position={scrollBarPosition} />}
        {children}
        {scrollBarPosition === 'fixed' && <ScrollBar visible={scrollBarVisible} position={scrollBarPosition} />}
      </div>
    );
  }

}
