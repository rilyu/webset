"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

var _Row = _interopRequireDefault(require("./Row/Row"));

var _Field = _interopRequireDefault(require("./Field/Field"));

var _Text = _interopRequireDefault(require("./Text/Text"));

var _Input = _interopRequireDefault(require("./Input/Input"));

var _InputNumber = _interopRequireDefault(require("./InputNumber/InputNumber"));

var _Select = _interopRequireDefault(require("./Select/Select"));

var _BaseEnum = _interopRequireDefault(require("./Enum/BaseEnum"));

var _BaseTree = _interopRequireDefault(require("./Enum/BaseTree"));

var _Enum = _interopRequireDefault(require("./Enum/Enum"));

var _CheckboxEnum = _interopRequireDefault(require("./Enum/CheckboxEnum"));

var _TimePicker = _interopRequireDefault(require("./TimePicker/TimePicker"));

var _DatePicker = _interopRequireDefault(require("./DatePicker/DatePicker"));

var _Checkbox = _interopRequireDefault(require("./Checkbox/Checkbox"));

require("./Form.css");

var _excluded = ["className", "mode", "fieldProps", "value"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Form = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Form, _React$Component);

  var _super = _createSuper(Form);

  function Form(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Form);
    _this = _super.call(this, props);
    _this.fieldList = [];
    _this.titleWidth = 70;
    return _this;
  }

  (0, _createClass2.default)(Form, [{
    key: "register",
    value: function register(field) {
      this.fieldList.indexOf(field) < 0 && this.fieldList.push(field);

      if (field && field.titleElement) {
        var domElement = _reactDom.default.findDOMNode(field.titleElement);

        if (domElement) {
          // 这种方式在父元素存在缩放时不准确 let {width} = domElement.getBoundingClientRect();
          var width = parseFloat(window.getComputedStyle(domElement).width);

          if (width > this.titleWidth) {
            this.titleWidth = Math.ceil(width);
            this.forceUpdate();
          }
        }
      }
    }
  }, {
    key: "unregister",
    value: function unregister(field) {
      var index = this.fieldList.indexOf(field);
      if (index >= 0) this.fieldList.splice(index, 1);
    }
  }, {
    key: "hasError",
    get: function get() {
      var _iterator = _createForOfIteratorHelper(this.fieldList),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var field = _step.value;
          if (field.error) return true;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          mode = _this$props.mode,
          fieldProps = _this$props.fieldProps,
          value = _this$props.value,
          others = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      fieldProps = _objectSpread({}, fieldProps);
      fieldProps.titleStyle = _objectSpread({
        minWidth: this.titleWidth
      }, fieldProps.titleStyle);
      return /*#__PURE__*/_react.default.createElement(_FormContext.default.Provider, {
        value: {
          form: this,
          mode: mode,
          fieldProps: fieldProps
        }
      }, /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
        className: "ws-form ".concat(className || '')
      }, others)));
    }
  }]);
  return Form;
}(_react.default.Component);

exports.default = Form;
Form.propTypes = {
  mode: _propTypes.default.oneOf(['form', 'edit', 'view', 'string']),
  // form:输入且校验值  edit:输入但不校验值  view:仅显示  string:仅返回值字符串
  fieldProps: _propTypes.default.object // 作为 field 的默认属性, Field 属性优先级: get initProps() < Form.props.fieldProps < static defaultProps < props

};
Form.defaultProps = {
  mode: 'form'
};
Form.Row = _Row.default;
Form.Field = _Field.default;
Form.Text = _Text.default;
Form.Input = _Input.default;
Form.InputNumber = _InputNumber.default;
Form.Select = _Select.default;
Form.BaseEnum = _BaseEnum.default;
Form.BaseTree = _BaseTree.default;
Form.Enum = _Enum.default;
Form.CheckboxEnum = _CheckboxEnum.default;
Form.TimePicker = _TimePicker.default;
Form.DatePicker = _DatePicker.default;
Form.Checkbox = _Checkbox.default;