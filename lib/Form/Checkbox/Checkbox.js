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

var _Field2 = _interopRequireDefault(require("../Field/Field"));

require("./Checkbox.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Checkbox = /*#__PURE__*/function (_Field) {
  (0, _inherits2.default)(Checkbox, _Field);

  var _super = _createSuper(Checkbox);

  function Checkbox() {
    (0, _classCallCheck2.default)(this, Checkbox);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Checkbox, [{
    key: "renderTitle",
    value: function renderTitle() {
      var _this = this;

      var _this$mergeProps = this.mergeProps,
          titleStyle = _this$mergeProps.titleStyle,
          titleMode = _this$mergeProps.titleMode;
      if (titleMode === 'none') return null;
      return /*#__PURE__*/_react.default.createElement("div", {
        style: titleStyle,
        className: "ws-field-title",
        ref: function ref(v) {
          return _this.titleElement = v;
        }
      });
    }
  }, {
    key: "renderDetail",
    value: function renderDetail() {
      var _this$mergeProps2 = this.mergeProps,
          title = _this$mergeProps2.title,
          mode = _this$mergeProps2.mode,
          required = _this$mergeProps2.required;
      var _this$otherProps = this.otherProps,
          value = _this$otherProps.value,
          checked = _this$otherProps.checked,
          valueType = _this$otherProps.valueType,
          readOnly = _this$otherProps.readOnly,
          _onChange = _this$otherProps.onChange,
          others = (0, _objectWithoutProperties2.default)(_this$otherProps, ["value", "checked", "valueType", "readOnly", "onChange"]);
      if (readOnly === undefined) readOnly = mode === 'view';
      if (value === undefined) value = checked;

      var toChecked = function toChecked(v) {
        return valueType === 'string' ? typeof v === 'string' && v.toLowerCase() === 'true' : !!v;
      };

      var toValue = function toValue(v) {
        if (v === null || v === undefined || valueType === 'bool') return v;
        return valueType === 'string' ? v ? 'true' : 'false' : v ? 1 : 0;
      };

      return /*#__PURE__*/_react.default.createElement(_antd.Checkbox, (0, _extends2.default)({}, others, {
        className: "ws-field-checkbox ".concat(required ? 'ws-field-required' : ''),
        checked: toChecked(value),
        onChange: function onChange(e) {
          return !readOnly && _onChange && _onChange(toValue(e.target.checked));
        }
      }), title);
    }
  }, {
    key: "renderValueString",
    value: function renderValueString(value) {
      return value ? '是' : '否';
    }
  }]);
  return Checkbox;
}(_Field2.default);

exports.default = Checkbox;
Checkbox.propTypes = _objectSpread(_objectSpread({}, _Field2.default.propTypes), {}, {
  value: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string, _propTypes.default.number]),
  valueType: _propTypes.default.oneOf(['bool', 'string', 'number']),
  readOnly: _propTypes.default.bool
});
Checkbox.defaultProps = _objectSpread(_objectSpread({}, _Field2.default.defaultProps), {}, {
  valueType: 'bool'
});