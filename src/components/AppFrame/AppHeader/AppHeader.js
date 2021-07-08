// AppHeader.js

import React from 'react';
import PropTypes from 'prop-types';

import './AppHeader.css';

export default class AppHeader extends React.Component {

  static propTypes = {
    appLogo: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    appTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    appSubTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    headerTail: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };

  render() {
    let {appLogo, appTitle, appSubTitle, headerTail, className, children, ...others} = this.props;
    return (
      <div className={`ws-app-header ${className || ''}`} {...others}>
        {!appLogo || React.isValidElement(appLogo) ? appLogo : <img className='ws-app-logo' src={appLogo} alt='' />}
        <div className='ws-app-title-container'>
          {!!appTitle && <div className='ws-app-title'>{appTitle}</div>}
          {!!appSubTitle && <div className='ws-app-sub-title'>{appSubTitle}</div>}
        </div>
        <div className='ws-app-header-content'>
          {children}
        </div>
        {headerTail}
      </div>
    );
  }

}
