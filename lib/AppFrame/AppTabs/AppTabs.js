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

var _antd = require("antd");

var _FlexTabs = _interopRequireDefault(require("../../FlexTabs/FlexTabs"));

var _ScrollView = _interopRequireDefault(require("../../ScrollView/ScrollView"));

require("./AppTabs.css");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var AppTabs = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(AppTabs, _React$Component);

  var _super = _createSuper(AppTabs);

  function AppTabs() {
    (0, _classCallCheck2.default)(this, AppTabs);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(AppTabs, [{
    key: "renderTab",
    value: function renderTab(key) {
      var _this = this;

      var _this$props$navigator = this.props.navigator.state.pageSet[key],
          _this$props$navigator2 = _this$props$navigator.params,
          title = _this$props$navigator2.title,
          icon = _this$props$navigator2.icon,
          noClose = _this$props$navigator.options.noClose;

      var extraMenuClick = function extraMenuClick(menuKey) {
        switch (menuKey) {
          case 'close':
            _this.props.navigator.close(key);

            break;

          case 'closeAll':
            _this.props.navigator.closeAll();

            break;

          case 'closeOthers':
            _this.props.navigator.closeOthers(key);

            break;

          case 'closeLeft':
            _this.props.navigator.closeLeft(key);

            break;

          case 'closeRight':
            _this.props.navigator.closeRight(key);

            break;

          default:
            break;
        }
      };

      var overlay = /*#__PURE__*/_react.default.createElement(_antd.Menu, {
        onClick: function onClick(item) {
          return extraMenuClick(item.key);
        }
      }, /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
        key: "close"
      }, "\u5173\u95ED"), /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
        key: "closeOthers"
      }, "\u5173\u95ED\u5176\u5B83"), /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
        key: "closeRight"
      }, "\u5173\u95ED\u53F3\u8FB9"));

      return /*#__PURE__*/_react.default.createElement(_antd.Dropdown, {
        overlay: overlay,
        trigger: ['contextMenu']
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "ws-app-tabs-title"
      }, icon ? typeof icon === 'string' ? /*#__PURE__*/_react.default.createElement(_antd.Icon, {
        type: icon
      }) : icon : null, title, !noClose && /*#__PURE__*/_react.default.createElement(_antd.Icon, {
        type: "close",
        onClick: function onClick(e) {
          _this.props.navigator.close(key);

          e.stopPropagation();
        }
      })));
    }
  }, {
    key: "renderPane",
    value: function renderPane(key) {
      var page = this.props.navigator.state.pageSet[key];
      return /*#__PURE__*/_react.default.createElement(_FlexTabs.default.TabPane, {
        key: key,
        tab: this.renderTab(key),
        closable: !page.options.noClose
      }, /*#__PURE__*/_react.default.createElement(_ScrollView.default, {
        className: "ws-app-tabs-scroll-view"
      }, page.render()));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          navigator = _this$props.navigator,
          activeKey = _this$props.activeKey,
          type = _this$props.type,
          className = _this$props.className,
          children = _this$props.children,
          onChange = _this$props.onChange,
          others = (0, _objectWithoutProperties2.default)(_this$props, ["navigator", "activeKey", "type", "className", "children", "onChange"]);
      var _navigator$state = navigator.state,
          activePath = _navigator$state.activePath,
          pageSet = _navigator$state.pageSet;
      return /*#__PURE__*/_react.default.createElement(_FlexTabs.default, (0, _extends2.default)({
        className: "ws-app-tabs ".concat(pageSet[activePath] && pageSet[activePath].options.grayTab ? 'ws-app-tabs-gray' : '', " ").concat(className || ''),
        activeKey: activePath,
        onChange: function onChange(activeKey) {
          return navigator.switchTo(activeKey);
        },
        type: type
      }, others), Object.keys(pageSet).map(function (key) {
        return _this2.renderPane(key);
      }));
    }
  }]);
  return AppTabs;
}(_react.default.Component);

exports.default = AppTabs;
AppTabs.propTypes = {
  type: _propTypes.default.oneOf(['line', 'card']),
  navigator: _propTypes.default.object.isRequired
};
AppTabs.defaultProps = {
  type: 'card'
};