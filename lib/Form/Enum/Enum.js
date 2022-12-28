"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _BaseEnum2 = _interopRequireDefault(require("./BaseEnum"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Enum = /*#__PURE__*/function (_BaseEnum) {
  (0, _inherits2.default)(Enum, _BaseEnum);
  var _super = _createSuper(Enum);
  function Enum() {
    (0, _classCallCheck2.default)(this, Enum);
    return _super.apply(this, arguments);
  }
  (0, _createClass2.default)(Enum, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Enum.prototype), "componentDidUpdate", this) && (0, _get2.default)((0, _getPrototypeOf2.default)(Enum.prototype), "componentDidUpdate", this).call(this, prevProps, prevState);
      var _this$props = this.props,
        keyId = _this$props.keyId,
        parentKeyId = _this$props.parentKeyId,
        parentItemCode = _this$props.parentItemCode,
        extProp = _this$props.extProp;
      if (prevProps.keyId !== keyId || prevProps.parentKeyId !== parentKeyId || prevProps.parentItemCode !== parentItemCode || prevProps.extProp !== extProp) {
        this.loadData();
      }
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this$props2, keyId, parentKeyId, parentItemCode, extProp, _yield$this$context$h, success, data;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this$props2 = this.props, keyId = _this$props2.keyId, parentKeyId = _this$props2.parentKeyId, parentItemCode = _this$props2.parentItemCode, extProp = _this$props2.extProp;
              _context.next = 3;
              return this.context.http.loadEnumData({
                keyId: keyId,
                parentKeyId: parentKeyId,
                parentItemCode: parentItemCode
              });
            case 3:
              _yield$this$context$h = _context.sent;
              success = _yield$this$context$h.success;
              data = _yield$this$context$h.data;
              if (success) {
                // 20190629 修改为在前端过滤 extProp 以支持多项适配
                data = extProp ? data && data.filter(function (item) {
                  return item.extProp && item.extProp.split(',').indexOf(extProp + '') >= 0;
                }) : data;
              }
              return _context.abrupt("return", data);
            case 8:
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
    key: "getId",
    value: function getId(item) {
      return item && item.itemCode;
    }
  }, {
    key: "getName",
    value: function getName(item) {
      return item && item.itemName;
    }
  }, {
    key: "buildProps",
    value: function buildProps() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Enum.prototype), "buildProps", this).call(this);
      if (typeof this.mergeProps.value === 'number') {
        this.mergeProps.value = this.mergeProps.value + '';
        this.otherProps.value = this.otherProps.value + '';
      }
      if (typeof this.mergeProps.defaultValue === 'number') {
        this.mergeProps.defaultValue = this.mergeProps.defaultValue + '';
        this.otherProps.defaultValue = this.otherProps.defaultValue + '';
      }
    }
  }]);
  return Enum;
}(_BaseEnum2.default);
exports.default = Enum;
Enum.propTypes = _objectSpread(_objectSpread({}, _BaseEnum2.default.propTypes), {}, {
  keyId: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired,
  parentKeyId: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  parentItemCode: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  extProp: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]) //表中的 extProp 支持配置以逗号分隔的多个项，此属性仅支持单个
});