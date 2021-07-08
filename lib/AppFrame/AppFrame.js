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

var _AppHeader = _interopRequireDefault(require("./AppHeader/AppHeader"));

var _AppSider = _interopRequireDefault(require("./AppSider/AppSider"));

var _AppTabs = _interopRequireDefault(require("./AppTabs/AppTabs"));

var _AppMenu = _interopRequireDefault(require("./AppMenu/AppMenu"));

require("./AppFrame.css");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var AppFrame = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(AppFrame, _React$Component);

  var _super = _createSuper(AppFrame);

  function AppFrame(props) {
    var _this;

    (0, _classCallCheck2.default)(this, AppFrame);
    _this = _super.call(this, props);
    _this.state = {
      activePath: null,
      collapsed: false
    };
    return _this;
  }

  (0, _createClass2.default)(AppFrame, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.stateHandler = this.props.navigator.register('navigatorStateChange', function (_ref) {
        var activePath = _ref.activePath;
        return _this2.setState({
          activePath: activePath
        });
      });
      var activePath = this.props.navigator.state.activePath;
      this.setState({
        activePath: activePath
      });
      if (window.location.hash) this.props.navigator.open(window.location.hash.substr(1));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stateHandler.unregister();
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this$props = this.props,
          navigator = _this$props.navigator,
          menuTree = _this$props.menuTree,
          menuTheme = _this$props.menuTheme,
          menuPlace = _this$props.menuPlace;
      var _this$state = this.state,
          activePath = _this$state.activePath,
          collapsed = _this$state.collapsed;
      return /*#__PURE__*/_react.default.createElement(this.constructor.Menu, {
        menuTree: menuTree,
        theme: menuTheme,
        mode: menuPlace === 'header' ? 'horizontal' : 'inline',
        inlineCollapsed: collapsed,
        selectedKey: activePath,
        onChange: function onChange(selectedKey) {
          return navigator.routeTo(selectedKey);
        }
      });
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      var _this$props2 = this.props,
          appLogo = _this$props2.appLogo,
          appTitle = _this$props2.appTitle,
          appSubTitle = _this$props2.appSubTitle,
          headerTail = _this$props2.headerTail,
          menuPlace = _this$props2.menuPlace;
      return /*#__PURE__*/_react.default.createElement(this.constructor.Header, {
        appLogo: appLogo,
        appTitle: appTitle,
        appSubTitle: appSubTitle,
        headerTail: headerTail
      }, menuPlace === 'header' && this.renderMenu());
    }
  }, {
    key: "renderSider",
    value: function renderSider() {
      var _this3 = this;

      var _this$props3 = this.props,
          menuTheme = _this$props3.menuTheme,
          menuPlace = _this$props3.menuPlace,
          siderTrigger = _this$props3.siderTrigger,
          siderFooter = _this$props3.siderFooter;
      var collapsed = this.state.collapsed;
      return /*#__PURE__*/_react.default.createElement(this.constructor.Sider, {
        theme: menuTheme,
        collapsed: collapsed,
        siderTrigger: siderTrigger,
        siderFooter: siderFooter,
        onCollapse: function onCollapse(collapsed) {
          return _this3.setState({
            collapsed: collapsed
          });
        }
      }, menuPlace === 'sider' && this.renderMenu());
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      return /*#__PURE__*/_react.default.createElement(this.constructor.Tabs, {
        navigator: this.props.navigator
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-app"
      }, this.renderHeader(), /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-app-content-container"
      }, this.renderSider(), this.renderContent()));
    }
  }]);
  return AppFrame;
}(_react.default.Component);

exports.default = AppFrame;
AppFrame.propTypes = {
  navigator: _propTypes.default.object.isRequired,
  appLogo: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  appTitle: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  appSubTitle: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  menuTree: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string.isRequired,
    title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
    // 注意文字要用 span 包裹，否则 inlineCollapsed 时无法隐藏
    children: _propTypes.default.array
  })),
  menuTheme: _propTypes.default.oneOf(['light', 'dark']),
  menuPlace: _propTypes.default.oneOf(['sider', 'header']),
  headerTail: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  siderTrigger: _propTypes.default.element,
  // null for no trigger
  siderFooter: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element])
};
AppFrame.defaultProps = {
  menuTheme: 'dark',
  menuPlace: 'sider'
};
AppFrame.Header = _AppHeader.default;
AppFrame.Sider = _AppSider.default;
AppFrame.Tabs = _AppTabs.default;
AppFrame.Menu = _AppMenu.default;