"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _AppContext = _interopRequireDefault(require("../../AppContext/AppContext"));

var _FormContext = _interopRequireDefault(require("../FormContext"));

require("./Field.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Field = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Field, _React$Component);

  var _super = _createSuper(Field);

  // *** 在此定义的全部属性均不会传递给 detail 组件
  // *** 默认属性应在 initProps 定义以使得可以合并 Form.fieldProps
  function Field(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Field);
    _this = _super.call(this, props);
    _this.formContext = {};
    return _this;
  }

  (0, _createClass2.default)(Field, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.formContext.form && this.formContext.form.register(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.formContext.form && this.formContext.form.unregister(this);
    }
  }, {
    key: "buildProps",
    value: function buildProps() {
      this.initProps = {
        span: 6,
        // Col 划分为 24 格，默认占 1/4
        titleMode: 'leftColon',
        required: false
      };
      var _this$formContext = this.formContext,
          mode = _this$formContext.mode,
          fieldProps = _this$formContext.fieldProps;

      var titleStyle = _objectSpread(_objectSpread(_objectSpread({}, this.initProps.titleStyle), fieldProps && fieldProps.titleStyle), this.props.titleStyle);

      this.mergeProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, this.initProps), {}, {
        mode: mode
      }, fieldProps), this.props), {}, {
        titleStyle: titleStyle
      });
      if (!this.mergeProps.mode) this.mergeProps.mode = 'edit';
      this.colProps = {};
      this.otherProps = {};

      for (var key in this.mergeProps) {
        if (key === 'className' || Field.propTypes[key] === undefined) this.otherProps[key] = this.mergeProps[key];else if (_antd.Col.propTypes[key] !== undefined) this.colProps[key] = this.mergeProps[key];
      }
    }
  }, {
    key: "error",
    get: function get() {
      if (this.props.verifier) return this.props.verifier(this);
      if (this.formContext.fieldProps && this.formContext.fieldProps.verifier) return this.formContext.fieldProps.verifier(this);else return this.defaultVerifier(this);
    }
  }, {
    key: "fieldClassName",
    get: function get() {
      return '';
    }
  }, {
    key: "defaultVerifier",
    value: function defaultVerifier(field) {
      var _ref = field.props || {},
          required = _ref.required,
          value = _ref.value,
          title = _ref.title;

      var getElementText = function getElementText(element) {
        if (!element) return '';
        if (typeof element === 'string') return element;
        var children = (element.props.children instanceof Array ? element.props.children : [element.props.children]).filter(Boolean);
        return children.map(function (item) {
          return getElementText(item);
        }).join('');
      };

      if (required && (value === null || value === undefined || value === '' || value instanceof Array && value.length === 0)) {
        return getElementText(title) + '不能为空';
      }

      return null;
    }
  }, {
    key: "renderTitle",
    value: function renderTitle() {
      var _this2 = this;

      var _this$mergeProps = this.mergeProps,
          title = _this$mergeProps.title,
          titleStyle = _this$mergeProps.titleStyle,
          titleMode = _this$mergeProps.titleMode,
          required = _this$mergeProps.required;
      if (titleMode === 'none') return null;
      return /*#__PURE__*/_react.default.createElement("div", {
        style: titleStyle,
        className: "ws-field-title ".concat(required ? 'ws-field-required' : ''),
        ref: function ref(v) {
          return _this2.titleElement = v;
        }
      }, title, "".concat(titleMode === 'leftColon' || titleMode === 'topColon' ? ':' : ''));
    }
  }, {
    key: "renderDetail",
    value: function renderDetail() {
      var _this$mergeProps2 = this.mergeProps,
          value = _this$mergeProps2.value,
          children = _this$mergeProps2.children;
      if (children) return children;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-field-detail"
      }, this.renderValueString(value));
    }
  }, {
    key: "renderValueString",
    value: function renderValueString(value) {
      return value ? "".concat(value) : '';
    }
  }, {
    key: "renderTail",
    value: function renderTail() {
      if (!this.mergeProps.tail) return null;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-field-tail"
      }, this.mergeProps.tail);
    }
  }, {
    key: "renderField",
    value: function renderField(formContext) {
      this.formContext = formContext || {};
      this.buildProps();
      var _this$mergeProps3 = this.mergeProps,
          mode = _this$mergeProps3.mode,
          titleMode = _this$mergeProps3.titleMode,
          verify = _this$mergeProps3.verify,
          value = _this$mergeProps3.value,
          defaultValue = _this$mergeProps3.defaultValue;
      if (mode === 'string') return this.renderValueString(value || value === 0 || value === false ? value : defaultValue);
      var error = verify && mode === 'form' ? this.error : null;
      var modeClassName = "ws-field-".concat(mode);
      var titleModeClassName = titleMode === 'left' || titleMode === 'leftColon' ? 'ws-field-row' : '';
      var errorClassName = error ? 'ws-field-has-error' : '';
      return /*#__PURE__*/_react.default.createElement(_antd.Col, (0, _extends2.default)({}, this.colProps, {
        className: "ws-field ".concat(this.fieldClassName, " ").concat(modeClassName, " ").concat(titleModeClassName, " ").concat(errorClassName)
      }), this.renderTitle(), /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-field-detail-container"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-field-detail-row"
      }, this.renderDetail(), this.renderTail()), /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-field-error"
      }, error)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/_react.default.createElement(_FormContext.default.Consumer, null, function (formContext) {
        return _this3.renderField(formContext);
      });
    }
  }]);
  return Field;
}(_react.default.Component);

exports.default = Field;
Field.contextType = _AppContext.default;
Field.propTypes = _objectSpread(_objectSpread({}, _antd.Col.propTypes), {}, {
  mode: _propTypes.default.oneOf(['form', 'edit', 'view', 'string']),
  // 默认取 form.mode ， form.mode 未定义则默认为 edit
  title: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string]),
  titleStyle: _propTypes.default.object,
  titleMode: _propTypes.default.oneOf(['none', 'left', 'leftColon', 'top', 'topColon']),
  tail: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.bool]),
  required: _propTypes.default.bool,
  verify: _propTypes.default.bool,
  //verify: 是否校验，为true调用verifier校验，不设置时取context.defaultVerify值，默认不设置
  verifier: _propTypes.default.func //verifier: 校验器，函数参数为(field)，返回错误字符串，不设置时取context.defaultVerifier值
  // value 、 defaultValue 也是公共属性，但需要放在 otherProps 中，因此不能在此定义

});
Field.defaultProps = _objectSpread({}, _antd.Col.defaultProps);