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
var _excluded = ["position", "onHold", "onRelease", "onDraging", "onMouseDown"];
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ScrollBarThumb = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ScrollBarThumb, _React$Component);
  var _super = _createSuper(ScrollBarThumb);
  function ScrollBarThumb(props) {
    var _this;
    (0, _classCallCheck2.default)(this, ScrollBarThumb);
    _this = _super.call(this, props);
    _this.dragging = false;
    _this.startPoint = null;
    _this.startPosition = 0;
    return _this;
  }
  (0, _createClass2.default)(ScrollBarThumb, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.mouseMoveHandler = function (e) {
        return _this2.onMouseMove(e);
      };
      this.mouseUpHandler = function (e) {
        return _this2.onMouseUp(e);
      };
      window.addEventListener('mousemove', this.mouseMoveHandler);
      window.addEventListener('mouseup', this.mouseUpHandler);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('mousemove', this.mouseMoveHandler);
      window.removeEventListener('mouseup', this.mouseUpHandler);
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      if (e.button !== 0) return;
      var screenX = e.screenX,
        screenY = e.screenY;
      this.startPoint = {
        screenX: screenX,
        screenY: screenY
      };
      this.startPosition = this.props.position;
      this.dragging = true;
      this.props.onHold && this.props.onHold();
      this.props.onMouseDown && this.props.onMouseDown(e);
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      if (!this.dragging) return;
      var screenX = e.screenX,
        screenY = e.screenY;
      var dx = screenX - this.startPoint.screenX;
      var dy = screenY - this.startPoint.screenY;
      this.props.onDraging && this.props.onDraging(this.startPosition, dx, dy);
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(e) {
      if (e.button !== 0 || !this.dragging) return;
      this.dragging = false;
      this.props.onRelease && this.props.onRelease();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props = this.props,
        position = _this$props.position,
        onHold = _this$props.onHold,
        onRelease = _this$props.onRelease,
        onDraging = _this$props.onDraging,
        onMouseDown = _this$props.onMouseDown,
        others = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
        onMouseDown: function onMouseDown(e) {
          return _this3.onMouseDown(e);
        }
      }, others));
    }
  }]);
  return ScrollBarThumb;
}(_react.default.Component);
exports.default = ScrollBarThumb;
ScrollBarThumb.propTypes = {
  position: _propTypes.default.number,
  onHold: _propTypes.default.func,
  onRelease: _propTypes.default.func,
  onDraging: _propTypes.default.func // (position, dx, dy)
};