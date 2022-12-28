"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _antd = require("antd");
var _ScrollView = _interopRequireDefault(require("../../ScrollView/ScrollView"));
require("./AppSider.css");
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var AppSider = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(AppSider, _React$Component);
  var _super = _createSuper(AppSider);
  function AppSider() {
    (0, _classCallCheck2.default)(this, AppSider);
    return _super.apply(this, arguments);
  }
  (0, _createClass2.default)(AppSider, [{
    key: "renderTrigger",
    value: function renderTrigger() {
      var _this$props = this.props,
        siderTrigger = _this$props.siderTrigger,
        collapsed = _this$props.collapsed,
        onCollapse = _this$props.onCollapse;
      if (siderTrigger !== undefined) return siderTrigger;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-app-sider-trigger",
        onClick: function onClick() {
          return onCollapse && onCollapse(!collapsed);
        }
      }, /*#__PURE__*/_react.default.createElement(_antd.Icon, {
        className: "icon",
        type: collapsed ? 'menu-unfold' : 'menu-fold'
      }));
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var children = this.props.children;
      if (!children && children !== 0) return null;
      return /*#__PURE__*/_react.default.createElement(_ScrollView.default, {
        className: "ws-app-sider-scroll-view"
      }, children);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        theme = _this$props2.theme,
        siderTrigger = _this$props2.siderTrigger,
        siderFooter = _this$props2.siderFooter,
        collapsed = _this$props2.collapsed,
        children = _this$props2.children;
      if (!siderTrigger && !siderFooter && !children && children !== 0) return false;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-app-sider ".concat(theme === 'dark' ? 'ws-app-sider-dark' : '', " ").concat(collapsed ? 'ws-app-sider-collapsed' : '')
      }, this.renderTrigger(), this.renderChildren(), siderFooter);
    }
  }]);
  return AppSider;
}(_react.default.Component);
exports.default = AppSider;
AppSider.propTypes = {
  theme: _propTypes.default.oneOf(['light', 'dark']),
  siderTrigger: _propTypes.default.element,
  // set null for no trigger
  siderFooter: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  collapsed: _propTypes.default.bool,
  onCollapse: _propTypes.default.func // (collapsed)
};
AppSider.defaultProps = {
  theme: 'light'
};