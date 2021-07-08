// SvgIcon.js

import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from 'antd';

export default class SvgIcon extends React.Component {

  static propTypes = {
    ...Icon.propTypes,
    src: PropTypes.string, // svg 图片 url, 默认不能跨域, base64('data:image/svg+xml;base64,...')格式也可以
  };

  static defaultProps = {
    ...Icon.defaultProps,
    viewBox: '0 0 1024 1024',
  }

  constructor(props) {
    super(props);
    this.state = {
      viewBox: null,
      paths: null,
    };
  }

  componentDidMount() {
    this.isMount = true;
    this.loadSvg();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.src !== prevProps.src) this.loadSvg();
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  async loadSvg() {
    let viewBox = null;
    let paths = null;
    let svgText = await this.getSvg(this.props.src);
    if (svgText) {
      let found = svgText.match(/\sviewBox=['"]([^'"]*)['"]/);
      if (found) viewBox = found[1];

      paths = [];
      let regex = /\sd=['"]([^'"]*)['"]/g;
      while (true) {
        let arr = regex.exec(svgText);
        if (!arr) break;
        paths.push(arr[1]);
      }
    }
    if (this.isMount) this.setState({viewBox, paths});
  }

  async getSvg(url) {
    if (!url) return false;
    let result = false;
    try {
      let response = await fetch(url, {method: 'GET'});
      if (response.ok) {
        result = await response.text();
      }
    } catch (error) {
      console.error(error);
    }
    return result;
  }

  render() {
    let {src, viewBox, ...others} = this.props;
    return (
      <Icon viewBox={this.state.viewBox || viewBox} {...others}>
        <g>
          {this.state.paths && this.state.paths.map((item, index) => <path d={item} key={index} />)}
        </g>
      </Icon>
    );
  }

}
