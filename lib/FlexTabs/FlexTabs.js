"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

require("./FlexTabs.css");

var _excluded = ["className", "animated"];

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FlexTabs = /*#__PURE__*/function (_Tabs) {
  (0, _inherits2.default)(FlexTabs, _Tabs);

  var _super = _createSuper(FlexTabs);

  function FlexTabs() {
    (0, _classCallCheck2.default)(this, FlexTabs);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(FlexTabs, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          animated = _this$props.animated,
          others = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      return /*#__PURE__*/_react.default.createElement(_antd.Tabs, (0, _extends2.default)({
        className: "flex-tabs ".concat(className || ''),
        animated: false
      }, others));
    }
  }]);
  return FlexTabs;
}(_antd.Tabs);

exports.default = FlexTabs;