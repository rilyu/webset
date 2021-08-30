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

var _ScrollBar = _interopRequireDefault(require("./ScrollBar"));

require("./ScrollView.css");

var _excluded = ["className", "scrollBarVisible", "scrollBarPosition", "children"];

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ScrollView = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ScrollView, _React$Component);

  var _super = _createSuper(ScrollView);

  function ScrollView() {
    (0, _classCallCheck2.default)(this, ScrollView);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(ScrollView, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          scrollBarVisible = _this$props.scrollBarVisible,
          scrollBarPosition = _this$props.scrollBarPosition,
          children = _this$props.children,
          others = (0, _objectWithoutProperties2.default)(_this$props, _excluded);

      if (scrollBarPosition !== 'sticky' && scrollBarPosition !== 'fixed') {
        scrollBarPosition = window.CSS && window.CSS.supports && window.CSS.supports('position', 'sticky') ? 'sticky' : 'fixed';
      }

      return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
        className: "ws-scroll-view ".concat(className || '')
      }, others), scrollBarPosition === 'sticky' && /*#__PURE__*/_react.default.createElement(_ScrollBar.default, {
        visible: scrollBarVisible,
        position: scrollBarPosition
      }), children, scrollBarPosition === 'fixed' && /*#__PURE__*/_react.default.createElement(_ScrollBar.default, {
        visible: scrollBarVisible,
        position: scrollBarPosition
      }));
    }
  }]);
  return ScrollView;
}(_react.default.Component);

exports.default = ScrollView;
ScrollView.propTypes = {
  scrollBarVisible: _propTypes.default.oneOf(['hover', 'auto', 'visible', 'hidden']),
  scrollBarPosition: _propTypes.default.oneOf(['auto', // use sticky if supports, otherwise fixed
  'sticky', // doesn't support IE
  'fixed' // doesn't work when using transform in chrome
  ])
};
ScrollView.defaultProps = {
  scrollBarVisible: 'hover',
  scrollBarPosition: 'auto'
};
ScrollView.ScrollBar = _ScrollBar.default;