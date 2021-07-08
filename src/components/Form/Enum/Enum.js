// Enum.js

import PropTypes from 'prop-types';

import BaseEnum from './BaseEnum';

export default class Enum extends BaseEnum {

  static propTypes = {
    ...BaseEnum.propTypes,
    keyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    parentKeyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    parentItemCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    extProp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //表中的 extProp 支持配置以逗号分隔的多个项，此属性仅支持单个
  };

  componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState);
    let {keyId, parentKeyId, parentItemCode, extProp} = this.props;
    if (prevProps.keyId !== keyId || prevProps.parentKeyId !== parentKeyId || prevProps.parentItemCode !== parentItemCode || prevProps.extProp !== extProp) {
      this.loadData();
    }    
  }

  async fetchData() {
    let {keyId, parentKeyId, parentItemCode, extProp} = this.props;
    let {success, data} = await this.context.http.loadEnumData({keyId, parentKeyId, parentItemCode});
    if (success) {
      // 20190629 修改为在前端过滤 extProp 以支持多项适配
      data = extProp ? (data && data.filter(item => item.extProp && item.extProp.split(',').indexOf(extProp + '') >= 0)) : data;
    }
    return data;
  }

  getId(item) {
    return item && item.itemCode;
  }

  getName(item) {
    return item && item.itemName;
  }

  buildProps() {
    super.buildProps();
    if (typeof this.mergeProps.value === 'number') {
      this.mergeProps.value = this.mergeProps.value + '';
      this.otherProps.value = this.otherProps.value + '';
    }
    if (typeof this.mergeProps.defaultValue === 'number') {
      this.mergeProps.defaultValue = this.mergeProps.defaultValue + '';
      this.otherProps.defaultValue = this.otherProps.defaultValue + '';
    }
  }

}
