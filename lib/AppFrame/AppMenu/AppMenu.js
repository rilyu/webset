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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var AppMenu = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(AppMenu, _React$Component);

  var _super = _createSuper(AppMenu);

  function AppMenu(props) {
    var _this;

    (0, _classCallCheck2.default)(this, AppMenu);
    _this = _super.call(this, props);
    _this.state = {
      openKeys: [],
      inlineOpenKeys: []
    };
    return _this;
  }

  (0, _createClass2.default)(AppMenu, [{
    key: "renderItem",
    value: function renderItem(item, index) {
      var _this2 = this;

      var key = item.key,
          title = item.title,
          children = item.children;
      if (!children || children.length === 0) return /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
        key: key
      }, title);
      return /*#__PURE__*/_react.default.createElement(_antd.Menu.SubMenu, {
        key: key,
        title: title
      }, children.map(function (item, index) {
        return _this2.renderItem(item, index);
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          menuTree = _this$props.menuTree,
          theme = _this$props.theme,
          mode = _this$props.mode,
          inlineCollapsed = _this$props.inlineCollapsed,
          selectedKey = _this$props.selectedKey,
          onChange = _this$props.onChange,
          className = _this$props.className,
          others = (0, _objectWithoutProperties2.default)(_this$props, ["menuTree", "theme", "mode", "inlineCollapsed", "selectedKey", "onChange", "className"]);
      var _this$state = this.state,
          openKeys = _this$state.openKeys,
          inlineOpenKeys = _this$state.inlineOpenKeys;
      return /*#__PURE__*/_react.default.createElement(_antd.Menu, (0, _extends2.default)({}, others, mode === 'inline' ? {
        inlineCollapsed: inlineCollapsed
      } : {}, {
        className: "ws-app-menu ".concat(className || ''),
        theme: theme,
        mode: mode,
        selectedKeys: [selectedKey],
        openKeys: mode === 'inline' ? inlineOpenKeys : openKeys,
        onSelect: function onSelect(item) {
          return onChange && onChange(item.selectedKeys.length > 0 ? item.selectedKeys[0] : null);
        },
        onOpenChange: function onOpenChange(openKeys) {
          return mode === 'inline' ? _this3.setState({
            inlineOpenKeys: openKeys
          }) : _this3.setState({
            openKeys: openKeys
          });
        }
      }), menuTree && menuTree.map(function (item, index) {
        return _this3.renderItem(item, index);
      }));
    }
  }]);
  return AppMenu;
}(_react.default.Component);

exports.default = AppMenu;
AppMenu.propTypes = {
  menuTree: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string.isRequired,
    title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
    // 注意文字要用 span 包裹，否则 inlineCollapsed 时无法隐藏
    children: _propTypes.default.array
  })),
  theme: _propTypes.default.string,
  mode: _propTypes.default.oneOf(['vertical', 'horizontal', 'inline']),
  inlineCollapsed: _propTypes.default.bool,
  selectedKey: _propTypes.default.string,
  onChange: _propTypes.default.func //(selectedKey)

};