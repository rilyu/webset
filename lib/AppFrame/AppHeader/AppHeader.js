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
var _propTypes = _interopRequireDefault(require("prop-types"));
require("./AppHeader.css");
var _excluded = ["appLogo", "appTitle", "appSubTitle", "headerTail", "className", "children"];
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var AppHeader = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(AppHeader, _React$Component);
  var _super = _createSuper(AppHeader);
  function AppHeader() {
    (0, _classCallCheck2.default)(this, AppHeader);
    return _super.apply(this, arguments);
  }
  (0, _createClass2.default)(AppHeader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        appLogo = _this$props.appLogo,
        appTitle = _this$props.appTitle,
        appSubTitle = _this$props.appSubTitle,
        headerTail = _this$props.headerTail,
        className = _this$props.className,
        children = _this$props.children,
        others = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
        className: "ws-app-header ".concat(className || '')
      }, others), !appLogo || /*#__PURE__*/_react.default.isValidElement(appLogo) ? appLogo : /*#__PURE__*/_react.default.createElement("img", {
        className: "ws-app-logo",
        src: appLogo,
        alt: ""
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-app-title-container"
      }, !!appTitle && /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-app-title"
      }, appTitle), !!appSubTitle && /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-app-sub-title"
      }, appSubTitle)), /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-app-header-content"
      }, children), headerTail);
    }
  }]);
  return AppHeader;
}(_react.default.Component);
exports.default = AppHeader;
AppHeader.propTypes = {
  appLogo: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  appTitle: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  appSubTitle: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  headerTail: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element])
};