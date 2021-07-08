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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _AppProvider = _interopRequireDefault(require("../AppContext/AppProvider"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ContextMenu = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ContextMenu, _React$Component);

  var _super = _createSuper(ContextMenu);

  function ContextMenu(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ContextMenu);
    _this = _super.call(this, props);
    _this.state = {
      menuData: props.menuData
    };
    return _this;
  }

  (0, _createClass2.default)(ContextMenu, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.menuData !== prevProps.menuData) {
        this.setState({
          menuData: this.props.menuData
        });
      }
    }
  }, {
    key: "renderMenuItem",
    value: function renderMenuItem(item, index) {
      var _this2 = this;

      var key = item.key,
          title = item.title,
          icon = item.icon,
          disabled = item.disabled,
          hidden = item.hidden,
          onClick = item.onClick,
          children = item.children;
      if (hidden) return null;
      if (title === '---') return /*#__PURE__*/_react.default.createElement(_antd.Menu.Divider, {
        key: index
      });
      title = /*#__PURE__*/_react.default.createElement("span", null, typeof icon === 'string' ? /*#__PURE__*/_react.default.createElement(_antd.Icon, {
        type: icon
      }) : icon, /*#__PURE__*/_react.default.createElement("span", null, title));

      if (!children || children.length === 0) {
        return /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
          key: key,
          disabled: disabled,
          onClick: onClick
        }, title);
      }

      return /*#__PURE__*/_react.default.createElement(_antd.Menu.SubMenu, {
        key: key,
        title: title,
        disabled: disabled
      }, children.map(function (item, index) {
        return _this2.renderMenuItem(item, index);
      }));
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this3 = this;

      var menuData = this.state.menuData;
      if (!menuData) return this.props.overlay;
      return /*#__PURE__*/_react.default.createElement(_antd.Menu, null, menuData.map(function (item, index) {
        return _this3.renderMenuItem(item, index);
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          menuData = _this$props.menuData,
          overlay = _this$props.overlay,
          others = (0, _objectWithoutProperties2.default)(_this$props, ["menuData", "overlay"]);
      return /*#__PURE__*/_react.default.createElement(_antd.Dropdown, (0, _extends2.default)({
        overlay: this.renderMenu()
      }, others));
    }
  }], [{
    key: "show",
    value: function show(left, top, options) {
      var _this4 = this;

      var renderElement = function renderElement(props) {
        return /*#__PURE__*/_react.default.createElement(_this4.prototype.constructor, (0, _extends2.default)({}, props, {
          defaultVisible: true,
          onVisibleChange: function onVisibleChange(visible) {
            props && props.onVisibleChange && props.onVisibleChange(visible);
            !visible && _AppProvider.default.remove(result.key);
          }
        }), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            position: 'fixed',
            width: 0,
            height: 0,
            left: left,
            top: top
          }
        }));
      };

      var key = _AppProvider.default.add(renderElement(options));

      var result = {
        key: key,
        close: function close() {
          return _AppProvider.default.remove(key);
        },
        update: function update(props) {
          return _AppProvider.default.update(key, renderElement(props));
        }
      };
      return result;
    }
  }]);
  return ContextMenu;
}(_react.default.Component);

exports.default = ContextMenu;
ContextMenu.propTypes = _objectSpread(_objectSpread({}, _antd.Dropdown.propTypes), {}, {
  menuData: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string,
    title: _propTypes.default.string,
    icon: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
    disabled: _propTypes.default.bool,
    hidden: _propTypes.default.bool,
    onClick: _propTypes.default.func,
    children: _propTypes.default.array
  }))
});
ContextMenu.defaultProps = _objectSpread(_objectSpread({}, _antd.Dropdown.defaultProps), {}, {
  trigger: ['contextMenu']
});