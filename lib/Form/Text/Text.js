"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _Field2 = _interopRequireDefault(require("../Field/Field"));

require("./Text.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Text = /*#__PURE__*/function (_Field) {
  (0, _inherits2.default)(Text, _Field);

  var _super = _createSuper(Text);

  function Text() {
    (0, _classCallCheck2.default)(this, Text);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Text, [{
    key: "fieldClassName",
    get: function get() {
      return 'ws-field-text';
    }
  }, {
    key: "renderText",
    value: function renderText() {
      var _this$mergeProps = this.mergeProps,
          value = _this$mergeProps.value,
          underline = _this$mergeProps.underline;
      return /*#__PURE__*/_react.default.createElement("p", {
        className: "ws-field-detail ".concat(underline ? 'ws-field-text-underline' : '')
      }, value);
    }
  }, {
    key: "renderCollapseText",
    value: function renderCollapseText() {
      var _this$mergeProps2 = this.mergeProps,
          value = _this$mergeProps2.value,
          underline = _this$mergeProps2.underline;
      return /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
        title: value
      }, /*#__PURE__*/_react.default.createElement("p", {
        className: "ws-field-detail ws-field-text-collapse ".concat(underline ? 'ws-field-text-underline' : '')
      }, value));
    }
  }, {
    key: "renderDetail",
    value: function renderDetail() {
      var collapse = this.mergeProps.collapse;
      return collapse ? this.renderCollapseText() : this.renderText();
    }
  }]);
  return Text;
}(_Field2.default);

exports.default = Text;
Text.propTypes = _objectSpread(_objectSpread({}, _Field2.default.propTypes), {}, {
  underline: _propTypes.default.bool,
  collapse: _propTypes.default.bool
});
Text.defaultProps = _objectSpread(_objectSpread({}, _Field2.default.defaultProps), {}, {
  underline: false,
  collapse: false
});