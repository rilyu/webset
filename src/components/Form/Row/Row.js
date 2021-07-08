// Row.js

import {Row as AntRow} from 'antd';

export default class Row extends AntRow {

  static defaultProps = {
    type: 'flex',
    align: 'top', // top middle bottom
    gutter: 0,
    justify: 'start', // start end center space-around space-between
  };

  render() {
    return super.render();
  }

}
