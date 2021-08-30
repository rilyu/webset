"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _antd = require("antd");

var _Field2 = _interopRequireDefault(require("../Field/Field"));

require("./DatePicker.css");

var _excluded = ["type", "valueType", "value", "defaultValue", "defaultPickerValue", "onChange", "readOnly", "format"],
    _excluded2 = ["type", "valueType", "value", "defaultValue", "defaultPickerValue", "onChange", "readOnly", "format"],
    _excluded3 = ["type", "valueType", "value", "defaultValue", "onChange", "readOnly", "format"],
    _excluded4 = ["type", "valueType", "value", "defaultValue", "defaultPickerValue", "onChange", "readOnly", "format"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var DatePicker = /*#__PURE__*/function (_Field) {
  (0, _inherits2.default)(DatePicker, _Field);

  var _super = _createSuper(DatePicker);

  function DatePicker() {
    (0, _classCallCheck2.default)(this, DatePicker);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(DatePicker, [{
    key: "readOnlyProps",
    get: function get() {
      var _this$mergeProps = this.mergeProps,
          readOnly = _this$mergeProps.readOnly,
          mode = _this$mergeProps.mode;
      if (readOnly === undefined) readOnly = mode === 'view';
      return readOnly ? {
        open: false,
        allowClear: false
      } : {};
    }
  }, {
    key: "defaultVerifier",
    value: function defaultVerifier(field) {
      var _ref = field.props || {},
          required = _ref.required,
          value = _ref.value,
          title = _ref.title;

      if (required) {
        var valueList = value instanceof Array ? value : [value];

        if (valueList.some(function (item) {
          return item === null || item === undefined || item === '';
        })) {
          return title + '不能为空';
        }
      }

      return null;
    }
  }, {
    key: "format",
    get: function get() {
      var _this$mergeProps2 = this.mergeProps,
          type = _this$mergeProps2.type,
          format = _this$mergeProps2.format,
          showTime = _this$mergeProps2.showTime;
      if (format) return format;

      switch (type) {
        case 'date':
          return showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';

        case 'month':
          return 'YYYY-MM';

        case 'year':
          return 'YYYY';

        case 'range':
          return showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';

        default:
          return null;
      }
    }
  }, {
    key: "momentValue",
    value: function momentValue(value) {
      var _this = this;

      if (value instanceof Array) return value.map(function (item) {
        return _this.momentValue(item);
      });

      switch ((0, _typeof2.default)(value)) {
        case 'string':
          return (0, _moment.default)(value, this.format);

        case 'number':
          return (0, _moment.default)(value);

        default:
          return value;
      }
    }
  }, {
    key: "stringValue",
    value: function stringValue(value) {
      var _this2 = this;

      if (value instanceof Array) return value.map(function (item) {
        return _this2.stringValue(item);
      });
      value = this.momentValue(value);
      return value && value.format(this.format);
    }
  }, {
    key: "timestampValue",
    value: function timestampValue(value) {
      var _this3 = this;

      if (value instanceof Array) return value.map(function (item) {
        return _this3.timestampValue(item);
      });
      value = this.momentValue(value);
      return value && value.valueOf();
    }
  }, {
    key: "outValue",
    value: function outValue(value) {
      switch (this.mergeProps.valueType) {
        case 'moment':
          return this.momentValue(value);

        case 'string':
          return this.stringValue(value);

        case 'timestamp':
          return this.timestampValue(value);

        default:
          return value;
      }
    }
  }, {
    key: "renderDatePicker",
    value: function renderDatePicker() {
      var _this4 = this;

      var _this$otherProps = this.otherProps,
          type = _this$otherProps.type,
          valueType = _this$otherProps.valueType,
          value = _this$otherProps.value,
          defaultValue = _this$otherProps.defaultValue,
          defaultPickerValue = _this$otherProps.defaultPickerValue,
          _onChange = _this$otherProps.onChange,
          readOnly = _this$otherProps.readOnly,
          format = _this$otherProps.format,
          others = (0, _objectWithoutProperties2.default)(_this$otherProps, _excluded);
      return /*#__PURE__*/_react.default.createElement(_antd.DatePicker, (0, _extends2.default)({}, others, this.readOnlyProps, {
        format: this.format,
        value: this.momentValue(value),
        defaultValue: this.momentValue(defaultValue),
        defaultPickerValue: this.momentValue(defaultPickerValue),
        onChange: function onChange(value) {
          return _onChange && _onChange(_this4.outValue(value));
        }
      }));
    }
  }, {
    key: "renderMonthPicker",
    value: function renderMonthPicker() {
      var _this5 = this;

      var _this$otherProps2 = this.otherProps,
          type = _this$otherProps2.type,
          valueType = _this$otherProps2.valueType,
          value = _this$otherProps2.value,
          defaultValue = _this$otherProps2.defaultValue,
          defaultPickerValue = _this$otherProps2.defaultPickerValue,
          _onChange2 = _this$otherProps2.onChange,
          readOnly = _this$otherProps2.readOnly,
          format = _this$otherProps2.format,
          others = (0, _objectWithoutProperties2.default)(_this$otherProps2, _excluded2);
      return /*#__PURE__*/_react.default.createElement(_antd.DatePicker.MonthPicker, (0, _extends2.default)({}, others, this.readOnlyProps, {
        format: this.format,
        value: this.momentValue(value),
        defaultValue: this.momentValue(defaultValue),
        defaultPickerValue: this.momentValue(defaultPickerValue),
        onChange: function onChange(value) {
          return _onChange2 && _onChange2(_this5.outValue(value));
        }
      }));
    }
  }, {
    key: "renderYearPicker",
    value: function renderYearPicker() {
      var _this6 = this;

      var _this$otherProps3 = this.otherProps,
          type = _this$otherProps3.type,
          valueType = _this$otherProps3.valueType,
          value = _this$otherProps3.value,
          defaultValue = _this$otherProps3.defaultValue,
          _onChange3 = _this$otherProps3.onChange,
          readOnly = _this$otherProps3.readOnly,
          format = _this$otherProps3.format,
          others = (0, _objectWithoutProperties2.default)(_this$otherProps3, _excluded3);
      var items = [];

      for (var i = 1970; i <= 2030; i++) {
        items.push((0, _moment.default)([i]));
      }

      return /*#__PURE__*/_react.default.createElement(_antd.Select, (0, _extends2.default)({}, others, this.readOnlyProps, {
        value: this.stringValue(value),
        defaultValue: this.stringValue(defaultValue),
        onChange: function onChange(value) {
          return _onChange3 && _onChange3(_this6.outValue(value));
        }
      }), items.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
          key: 'option' + index,
          value: item.format(_this6.format)
        }, item.format(_this6.format));
      }));
    }
  }, {
    key: "renderRangePicker",
    value: function renderRangePicker() {
      var _this7 = this;

      var _this$otherProps4 = this.otherProps,
          type = _this$otherProps4.type,
          valueType = _this$otherProps4.valueType,
          value = _this$otherProps4.value,
          defaultValue = _this$otherProps4.defaultValue,
          defaultPickerValue = _this$otherProps4.defaultPickerValue,
          _onChange4 = _this$otherProps4.onChange,
          readOnly = _this$otherProps4.readOnly,
          format = _this$otherProps4.format,
          others = (0, _objectWithoutProperties2.default)(_this$otherProps4, _excluded4);
      return /*#__PURE__*/_react.default.createElement(_antd.DatePicker.RangePicker, (0, _extends2.default)({}, others, this.readOnlyProps, {
        format: this.format,
        value: this.momentValue(value),
        defaultValue: this.momentValue(defaultValue),
        defaultPickerValue: this.momentValue(defaultPickerValue),
        onChange: function onChange(value) {
          return _onChange4 && _onChange4(_this7.outValue(value));
        }
      }));
    }
  }, {
    key: "renderDetail",
    value: function renderDetail() {
      switch (this.mergeProps.type) {
        case 'date':
          return this.renderDatePicker();

        case 'month':
          return this.renderMonthPicker();

        case 'year':
          return this.renderYearPicker();

        case 'range':
          return this.renderRangePicker();

        default:
          return null;
      }
    }
  }, {
    key: "renderValueString",
    value: function renderValueString(value) {
      if (!value || value instanceof Array && value.length === 0) return '';
      var stringValue = this.stringValue(value);
      if (stringValue instanceof Array) return stringValue.map(function (item) {
        return item || '';
      }).join(' ~ ');else return stringValue || '';
    }
  }]);
  return DatePicker;
}(_Field2.default);

exports.default = DatePicker;
DatePicker.propTypes = _objectSpread(_objectSpread({}, _Field2.default.propTypes), {}, {
  type: _propTypes.default.oneOf(['date', 'month', 'year', 'range']),
  valueType: _propTypes.default.oneOf(['moment', 'string', 'timestamp'])
});
DatePicker.defaultProps = _objectSpread(_objectSpread({}, _Field2.default.defaultProps), {}, {
  type: 'date',
  valueType: 'string',
  // antd 默认为 moment 格式，导致调用者代码比较复杂，因此改为默认字符串
  showTime: false,
  allowClear: true,
  placeholder: ''
});