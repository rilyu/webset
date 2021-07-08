// FlexTabs.js

import React from 'react';

import {Tabs} from 'antd';

import './FlexTabs.css';

export default class FlexTabs extends Tabs {

  render() {
    let {className, animated, ...others} = this.props;
    return (
      <Tabs className={`flex-tabs ${className || ''}`} animated={false} {...others} />
    );
  }

}
