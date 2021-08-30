"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _Field2 = _interopRequireDefault(require("../Field/Field"));

require("./InputNumber.css");

var _excluded = ["value", "defaultValue", "readOnly"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var InputNumber = /*#__PURE__*/function (_Field) {
  (0, _inherits2.default)(InputNumber, _Field);

  var _super = _createSuper(InputNumber);

  function InputNumber() {
    (0, _classCallCheck2.default)(this, InputNumber);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(InputNumber, [{
    key: "stringToNumber",
    value: function stringToNumber(value) {
      var result = parseFloat(value);
      if (isNaN(result)) result = null;
      return result;
    }
  }, {
    key: "renderDetail",
    value: function renderDetail() {
      var _this$otherProps = this.otherProps,
          value = _this$otherProps.value,
          defaultValue = _this$otherProps.defaultValue,
          readOnly = _this$otherProps.readOnly,
          others = (0, _objectWithoutProperties2.default)(_this$otherProps, _excluded);
      if (readOnly === undefined) readOnly = this.mergeProps.mode === 'view';
      return /*#__PURE__*/_react.default.createElement(_antd.InputNumber, (0, _extends2.default)({}, others, {
        value: this.stringToNumber(value),
        defaultValue: this.stringToNumber(defaultValue),
        readOnly: readOnly
      }));
    }
  }]);
  return InputNumber;
}(_Field2.default);

exports.default = InputNumber;
InputNumber.defaultProps = _objectSpread(_objectSpread({}, _Field2.default.defaultProps), {}, {
  min: -Infinity,
  max: Infinity,
  step: 1
});