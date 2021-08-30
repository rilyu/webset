"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _antd = require("antd");

var _Field2 = _interopRequireDefault(require("../Field/Field"));

require("./TimePicker.css");

var _excluded = ["valueType", "value", "defaultValue", "defaultOpenValue", "onChange", "readOnly", "format"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var TimePicker = /*#__PURE__*/function (_Field) {
  (0, _inherits2.default)(TimePicker, _Field);

  var _super = _createSuper(TimePicker);

  function TimePicker() {
    (0, _classCallCheck2.default)(this, TimePicker);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(TimePicker, [{
    key: "format",
    get: function get() {
      return this.mergeProps.format || 'HH:mm:ss';
    }
  }, {
    key: "momentValue",
    value: function momentValue(value) {
      var _this = this;

      if (value instanceof Array) return value.map(function (item) {
        return _this.momentValue(item);
      });

      switch ((0, _typeof2.default)(value)) {
        case 'string':
          return (0, _moment.default)(value, this.format);

        case 'number':
          return (0, _moment.default)(value);

        default:
          return value;
      }
    }
  }, {
    key: "stringValue",
    value: function stringValue(value) {
      var _this2 = this;

      if (value instanceof Array) return value.map(function (item) {
        return _this2.stringValue(item);
      });
      value = this.momentValue(value);
      return value && value.format(this.format);
    }
  }, {
    key: "timestampValue",
    value: function timestampValue(value) {
      var _this3 = this;

      if (value instanceof Array) return value.map(function (item) {
        return _this3.timestampValue(item);
      });
      value = this.momentValue(value);
      return value && value.valueOf();
    }
  }, {
    key: "outValue",
    value: function outValue(value) {
      switch (this.mergeProps.valueType) {
        case 'moment':
          return this.momentValue(value);

        case 'string':
          return this.stringValue(value);

        case 'timestamp':
          return this.timestampValue(value);

        default:
          return value;
      }
    }
  }, {
    key: "renderDetail",
    value: function renderDetail() {
      var _this4 = this;

      var _this$otherProps = this.otherProps,
          valueType = _this$otherProps.valueType,
          value = _this$otherProps.value,
          defaultValue = _this$otherProps.defaultValue,
          defaultOpenValue = _this$otherProps.defaultOpenValue,
          _onChange = _this$otherProps.onChange,
          readOnly = _this$otherProps.readOnly,
          format = _this$otherProps.format,
          others = (0, _objectWithoutProperties2.default)(_this$otherProps, _excluded);
      if (readOnly === undefined) readOnly = this.mergeProps.mode === 'view';
      var readOnlyProps = readOnly ? {
        inputReadOnly: true,
        open: false,
        allowClear: false
      } : {};
      return /*#__PURE__*/_react.default.createElement(_antd.TimePicker, (0, _extends2.default)({}, others, readOnlyProps, {
        format: this.format,
        value: this.momentValue(value),
        defaultValue: this.momentValue(defaultValue),
        defaultOpenValue: this.momentValue(defaultOpenValue),
        onChange: function onChange(value) {
          return _onChange && _onChange(_this4.outValue(value));
        }
      }));
    }
  }, {
    key: "renderValueString",
    value: function renderValueString(value) {
      return this.stringValue(value) || '';
    }
  }]);
  return TimePicker;
}(_Field2.default);

exports.default = TimePicker;
TimePicker.propTypes = _objectSpread(_objectSpread({}, _Field2.default.propTypes), {}, {
  valueType: _propTypes.default.oneOf(['moment', 'string', 'timestamp'])
});
TimePicker.defaultProps = _objectSpread(_objectSpread({}, _Field2.default.defaultProps), {}, {
  valueType: 'string',
  // antd 默认为 moment 格式，导致调用者代码比较复杂，因此改为默认字符串
  allowClear: true,
  placeholder: ''
});