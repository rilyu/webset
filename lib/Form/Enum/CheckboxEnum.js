"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _antd = require("antd");
var _BaseEnum2 = _interopRequireDefault(require("./BaseEnum"));
require("./CheckboxEnum.css");
var _excluded = ["className", "value", "valueType", "readOnly", "selectMode", "pageSize", "optionFilterProp", "onChange", "dataSource"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CheckboxEnum = /*#__PURE__*/function (_BaseEnum) {
  (0, _inherits2.default)(CheckboxEnum, _BaseEnum);
  var _super = _createSuper(CheckboxEnum);
  function CheckboxEnum(props) {
    var _this;
    (0, _classCallCheck2.default)(this, CheckboxEnum);
    _this = _super.call(this, props);
    _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
      popoverVisible: false,
      inputWidth: 0
    });
    return _this;
  }
  (0, _createClass2.default)(CheckboxEnum, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(CheckboxEnum.prototype), "componentDidUpdate", this) && (0, _get2.default)((0, _getPrototypeOf2.default)(CheckboxEnum.prototype), "componentDidUpdate", this).call(this, prevProps, prevState);
      if (this.props.dataSource !== prevProps.dataSource) {
        this.loadData();
      }
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.props.dataSource);
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function fetchData() {
        return _fetchData.apply(this, arguments);
      }
      return fetchData;
    }()
  }, {
    key: "selectAll",
    value: function selectAll() {
      var _this2 = this;
      this.props.onChange && this.props.onChange((this.state.data || []).map(function (item) {
        return _this2.getId(item);
      }));
    }
  }, {
    key: "selectNone",
    value: function selectNone() {
      this.props.onChange && this.props.onChange([]);
    }
  }, {
    key: "renderCheckboxItem",
    value: function renderCheckboxItem(item, index) {
      var _this$otherProps = this.otherProps,
        value = _this$otherProps.value,
        onChange = _this$otherProps.onChange;
      var itemId = this.getId(item);
      var toggleCheck = function toggleCheck(e) {
        if (e.target.checked) value = [].concat((0, _toConsumableArray2.default)(value || []), [itemId]);else value = value && value.filter(function (v) {
          return v !== itemId;
        });
        onChange && onChange(value);
      };
      return /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
        key: index,
        className: "ws-checkbox-enum-popover-row",
        checked: !!value && value.indexOf(itemId) >= 0,
        onChange: toggleCheck
      }, this.getName(item));
    }
  }, {
    key: "renderPopoverContent",
    value: function renderPopoverContent() {
      var _this3 = this;
      if (!this.state.data || this.state.data.length === 0) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "ws-checkbox-enum-popover-content",
          style: {
            minWidth: this.state.inputWidth || 'unset',
            textAlign: 'center'
          }
        }, "\u6682\u65E0\u6570\u636E");
      }
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-checkbox-enum-popover-content",
        style: {
          minWidth: this.state.inputWidth || 'unset'
        }
      }, this.state.data.map(function (item, index) {
        return _this3.renderCheckboxItem(item, index);
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-checkbox-enum-popover-footer"
      }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
        type: "link",
        size: "small",
        onClick: function onClick() {
          return _this3.selectAll();
        }
      }, "\u5168\u9009"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
        type: "link",
        size: "small",
        onClick: function onClick() {
          return _this3.selectNone();
        }
      }, "\u5168\u4E0D\u9009")));
    }
  }, {
    key: "renderInput",
    value: function renderInput() {
      var _this4 = this;
      var _this$otherProps2 = this.otherProps,
        className = _this$otherProps2.className,
        value = _this$otherProps2.value,
        valueType = _this$otherProps2.valueType,
        readOnly = _this$otherProps2.readOnly,
        selectMode = _this$otherProps2.selectMode,
        pageSize = _this$otherProps2.pageSize,
        optionFilterProp = _this$otherProps2.optionFilterProp,
        onChange = _this$otherProps2.onChange,
        dataSource = _this$otherProps2.dataSource,
        others = (0, _objectWithoutProperties2.default)(_this$otherProps2, _excluded);
      var checkWidth = function checkWidth(v) {
        var element = v && _reactDom.default.findDOMNode(v);
        if (element && element.clientWidth !== _this4.state.inputWidth) _this4.setState({
          inputWidth: element.clientWidth
        });
      };
      return /*#__PURE__*/_react.default.createElement(_antd.Input, (0, _extends2.default)({
        className: "ws-checkbox-enum-input ".concat(className || ''),
        value: this.renderValueString(value),
        readOnly: true,
        suffix: /*#__PURE__*/_react.default.createElement("span", {
          className: "ws-checkbox-enum-arrow ".concat(this.state.popoverVisible ? 'ws-checkbox-enum-arrow-open' : '')
        }, /*#__PURE__*/_react.default.createElement(_antd.Icon, {
          type: this.state.loading ? 'loading' : 'down'
        }))
      }, others, {
        ref: checkWidth
      }));
    }
  }, {
    key: "renderCheckbox",
    value: function renderCheckbox() {
      var _this5 = this;
      var _this$otherProps3 = this.otherProps,
        readOnly = _this$otherProps3.readOnly,
        disabled = _this$otherProps3.disabled;
      if (readOnly === undefined) readOnly = this.mergeProps.mode === 'view';
      if (readOnly || disabled) return this.renderInput();
      return /*#__PURE__*/_react.default.createElement(_antd.Popover, {
        content: this.renderPopoverContent(),
        trigger: "click",
        placement: "bottomRight",
        overlayClassName: "ws-checkbox-enum-popover",
        onVisibleChange: function onVisibleChange(popoverVisible) {
          return _this5.setState({
            popoverVisible: popoverVisible
          });
        }
      }, this.renderInput());
    }
  }, {
    key: "renderDetail",
    value: function renderDetail() {
      return this.otherProps.selectMode === 'checkbox' ? this.renderCheckbox() : (0, _get2.default)((0, _getPrototypeOf2.default)(CheckboxEnum.prototype), "renderDetail", this).call(this);
    }
  }]);
  return CheckboxEnum;
}(_BaseEnum2.default);
exports.default = CheckboxEnum;
CheckboxEnum.propTypes = _objectSpread(_objectSpread({}, _BaseEnum2.default.propTypes), {}, {
  dataSource: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.any,
    name: _propTypes.default.string
  }))
});
CheckboxEnum.defaultProps = _objectSpread(_objectSpread({}, _BaseEnum2.default.defaultProps), {}, {
  selectMode: 'checkbox' // 原 Select.mode ，可修改为其它值以表现为 BaseEnum 的方式，如传入 null 为默认单选模式
});