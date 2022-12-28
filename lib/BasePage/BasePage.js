"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _antd = require("antd");
var _AppContext = _interopRequireDefault(require("../AppContext/AppContext"));
require("./BasePage.css");
var _excluded = ["content", "title", "maskClosable", "destroyOnClose", "onOk", "onCancel"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var BasePage = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(BasePage, _React$Component);
  var _super = _createSuper(BasePage);
  function BasePage() {
    (0, _classCallCheck2.default)(this, BasePage);
    return _super.apply(this, arguments);
  }
  (0, _createClass2.default)(BasePage, [{
    key: "confirm",
    value: function confirm(_ref) {
      var content = _ref.content,
        _ref$title = _ref.title,
        title = _ref$title === void 0 ? '确认' : _ref$title,
        _ref$maskClosable = _ref.maskClosable,
        maskClosable = _ref$maskClosable === void 0 ? true : _ref$maskClosable,
        _ref$destroyOnClose = _ref.destroyOnClose,
        destroyOnClose = _ref$destroyOnClose === void 0 ? true : _ref$destroyOnClose,
        _onOk = _ref.onOk,
        _onCancel = _ref.onCancel,
        others = (0, _objectWithoutProperties2.default)(_ref, _excluded);
      return new Promise(function (resolve, reject) {
        _antd.Modal.confirm(_objectSpread(_objectSpread({}, others), {}, {
          title: title,
          content: content,
          maskClosable: maskClosable,
          destroyOnClose: destroyOnClose,
          onOk: function () {
            var _onOk2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {
              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.t0 = _onOk;
                    if (!_context.t0) {
                      _context.next = 4;
                      break;
                    }
                    _context.next = 4;
                    return _onOk(e);
                  case 4:
                    resolve(true);
                  case 5:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            function onOk(_x) {
              return _onOk2.apply(this, arguments);
            }
            return onOk;
          }(),
          onCancel: function () {
            var _onCancel2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {
              return _regenerator.default.wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.t0 = _onCancel;
                    if (!_context2.t0) {
                      _context2.next = 4;
                      break;
                    }
                    _context2.next = 4;
                    return _onCancel(e);
                  case 4:
                    resolve(false);
                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            function onCancel(_x2) {
              return _onCancel2.apply(this, arguments);
            }
            return onCancel;
          }()
        }));
      });
    }
  }, {
    key: "render",
    value: function render() {
      // 空白页内容，将在派生类中覆盖
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-page"
      }, this.props.children || /*#__PURE__*/_react.default.createElement("p", {
        className: "ws-page-empty"
      }, "\u5EFA\u8BBE\u4E2D..."));
    }
  }]);
  return BasePage;
}(_react.default.Component);
exports.default = BasePage;
BasePage.contextType = _AppContext.default;
BasePage.propTypes = {
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element])
};