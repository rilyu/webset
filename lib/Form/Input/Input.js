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
var _Field2 = _interopRequireDefault(require("../Field/Field"));
require("./Input.css");
var _excluded = ["readOnly", "onChange"],
  _excluded2 = ["readOnly", "onChange"];
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Input = /*#__PURE__*/function (_Field) {
  (0, _inherits2.default)(Input, _Field);
  var _super = _createSuper(Input);
  function Input() {
    (0, _classCallCheck2.default)(this, Input);
    return _super.apply(this, arguments);
  }
  (0, _createClass2.default)(Input, [{
    key: "renderInput",
    value: function renderInput(mode) {
      var _this$otherProps = this.otherProps,
        readOnly = _this$otherProps.readOnly,
        _onChange = _this$otherProps.onChange,
        others = (0, _objectWithoutProperties2.default)(_this$otherProps, _excluded);
      if (readOnly === undefined) readOnly = mode === 'view';
      return /*#__PURE__*/_react.default.createElement(_antd.Input, (0, _extends2.default)({}, others, {
        readOnly: readOnly,
        onChange: function onChange(e) {
          return _onChange && _onChange(e.target.value);
        }
      }));
    }
  }, {
    key: "renderTextArea",
    value: function renderTextArea(mode) {
      var _this$otherProps2 = this.otherProps,
        readOnly = _this$otherProps2.readOnly,
        _onChange2 = _this$otherProps2.onChange,
        others = (0, _objectWithoutProperties2.default)(_this$otherProps2, _excluded2);
      if (readOnly === undefined) readOnly = mode === 'view';
      return /*#__PURE__*/_react.default.createElement(_antd.Input.TextArea, (0, _extends2.default)({}, others, {
        readOnly: readOnly,
        onChange: function onChange(e) {
          return _onChange2 && _onChange2(e.target.value);
        }
      }));
    }
  }, {
    key: "renderDetail",
    value: function renderDetail() {
      var _this$mergeProps = this.mergeProps,
        mode = _this$mergeProps.mode,
        type = _this$mergeProps.type;
      return type === 'textarea' ? this.renderTextArea(mode) : this.renderInput(mode);
    }
  }]);
  return Input;
}(_Field2.default);
exports.default = Input;