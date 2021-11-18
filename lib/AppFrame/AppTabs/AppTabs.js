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

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _FlexTabs = _interopRequireDefault(require("../../FlexTabs/FlexTabs"));

var _ScrollView = _interopRequireDefault(require("../../ScrollView/ScrollView"));

require("./AppTabs.css");

var _excluded = ["navigator", "fullScreenAble", "fullScreenBar", "activeKey", "type", "tabBarExtraContent", "className", "children", "onChange"];

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var AppTabs = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(AppTabs, _React$Component);

  var _super = _createSuper(AppTabs);

  function AppTabs(props) {
    var _this;

    (0, _classCallCheck2.default)(this, AppTabs);
    _this = _super.call(this, props);
    _this.state = {
      fullScreen: false,
      hideBar: false
    };
    return _this;
  }

  (0, _createClass2.default)(AppTabs, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.mouseMoveHandler = function (e) {
        return _this2.onMouseMove(e);
      };

      this.mouseMoveHandler = window.addEventListener('mousemove', this.mouseMoveHandler);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('mousemove', this.mouseMoveHandler);
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      var _this3 = this;

      if (!this.state.fullScreen || this.props.fullScreenBar !== 'auto') return;
      var clientX = e.clientX,
          clientY = e.clientY;

      var _ref = this.flexTabs ? _reactDom.default.findDOMNode(this.flexTabs).getBoundingClientRect() : {
        left: 0,
        top: 0,
        right: 0
      },
          left = _ref.left,
          top = _ref.top,
          right = _ref.right;

      if (this.delayShowBarTimer) clearTimeout(this.delayShowBarTimer);
      if (this.delayHideBarTimer) clearTimeout(this.delayHideBarTimer);
      this.delayShowBarTimer = null;
      this.delayHideBarTimer = null;

      if (this.state.hideBar) {
        if (clientX >= left && clientX <= right && clientY >= top && clientY <= top + 12) {
          this.delayShowBarTimer = setTimeout(function () {
            return _this3.setState({
              hideBar: false
            });
          }, 500);
        }
      } else {
        if (clientX < left || clientX > right || clientY < top || clientY > top + 37) {
          this.delayHideBarTimer = setTimeout(function () {
            return _this3.setState({
              hideBar: true
            });
          }, 100);
        }
      }
    }
  }, {
    key: "renderTab",
    value: function renderTab(key) {
      var _this4 = this;

      var _this$props$navigator = this.props.navigator.state.pageSet[key],
          _this$props$navigator2 = _this$props$navigator.params,
          title = _this$props$navigator2.title,
          icon = _this$props$navigator2.icon,
          noClose = _this$props$navigator.options.noClose;

      var extraMenuClick = function extraMenuClick(menuKey) {
        switch (menuKey) {
          case 'close':
            _this4.props.navigator.close(key);

            break;

          case 'closeAll':
            _this4.props.navigator.closeAll();

            break;

          case 'closeOthers':
            _this4.props.navigator.closeOthers(key);

            break;

          case 'closeLeft':
            _this4.props.navigator.closeLeft(key);

            break;

          case 'closeRight':
            _this4.props.navigator.closeRight(key);

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
          _this4.props.navigator.close(key);

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
    key: "renderTabBarExtraContent",
    value: function renderTabBarExtraContent() {
      var _this5 = this;

      var _this$props = this.props,
          fullScreenAble = _this$props.fullScreenAble,
          fullScreenBar = _this$props.fullScreenBar,
          tabBarExtraContent = _this$props.tabBarExtraContent;
      var fullScreen = this.state.fullScreen;
      if (!fullScreenAble) return tabBarExtraContent;

      var onClick = function onClick() {
        fullScreen = !fullScreen;

        _this5.setState({
          fullScreen: fullScreen,
          hideBar: fullScreenBar === 'hide'
        });

        if (fullScreen && fullScreenBar === 'auto') setTimeout(function () {
          return _this5.setState({
            hideBar: true
          });
        }, 500);
      };

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, tabBarExtraContent, /*#__PURE__*/_react.default.createElement(_antd.Button, {
        type: "link",
        size: "small",
        icon: fullScreen ? 'switcher' : 'border',
        onClick: onClick
      }, fullScreen ? '还原' : '全屏'));
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$props2 = this.props,
          navigator = _this$props2.navigator,
          fullScreenAble = _this$props2.fullScreenAble,
          fullScreenBar = _this$props2.fullScreenBar,
          activeKey = _this$props2.activeKey,
          type = _this$props2.type,
          tabBarExtraContent = _this$props2.tabBarExtraContent,
          className = _this$props2.className,
          children = _this$props2.children,
          onChange = _this$props2.onChange,
          others = (0, _objectWithoutProperties2.default)(_this$props2, _excluded);
      var _this$state = this.state,
          fullScreen = _this$state.fullScreen,
          hideBar = _this$state.hideBar;
      var _navigator$state = navigator.state,
          activePath = _navigator$state.activePath,
          pageSet = _navigator$state.pageSet;
      var pageSetClassName = pageSet[activePath] && pageSet[activePath].options.grayTab ? 'ws-app-tabs-gray' : '';
      var fullScreenClassName = "".concat(fullScreen ? 'ws-full-screen' : '', " ").concat(fullScreenBar === 'hide' || hideBar ? 'ws-app-tabs-bar-hide' : '');
      return /*#__PURE__*/_react.default.createElement(_FlexTabs.default, (0, _extends2.default)({
        className: "ws-app-tabs ".concat(pageSetClassName, " ").concat(fullScreenClassName, " ").concat(className || ''),
        activeKey: activePath,
        type: type,
        tabBarExtraContent: this.renderTabBarExtraContent(),
        onChange: function onChange(activeKey) {
          return navigator.switchTo(activeKey);
        }
      }, others, {
        ref: function ref(v) {
          return _this6.flexTabs = v;
        }
      }), Object.keys(pageSet).map(function (key) {
        return _this6.renderPane(key);
      }));
    }
  }]);
  return AppTabs;
}(_react.default.Component);

exports.default = AppTabs;
AppTabs.propTypes = {
  type: _propTypes.default.oneOf(['line', 'card']),
  navigator: _propTypes.default.object.isRequired,
  fullScreenAble: _propTypes.default.bool,
  fullScreenBar: _propTypes.default.oneOf(['auto', 'show', 'hide'])
};
AppTabs.defaultProps = {
  type: 'card',
  fullScreenAble: false,
  fullScreenBar: 'show'
};