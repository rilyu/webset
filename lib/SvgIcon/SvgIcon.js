"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _antd = require("antd");
var _excluded = ["src", "viewBox"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var SvgIcon = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(SvgIcon, _React$Component);
  var _super = _createSuper(SvgIcon);
  function SvgIcon(props) {
    var _this;
    (0, _classCallCheck2.default)(this, SvgIcon);
    _this = _super.call(this, props);
    _this.state = {
      viewBox: null,
      paths: null
    };
    return _this;
  }
  (0, _createClass2.default)(SvgIcon, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isMount = true;
      this.loadSvg();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.src !== prevProps.src) this.loadSvg();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMount = false;
    }
  }, {
    key: "loadSvg",
    value: function () {
      var _loadSvg = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var viewBox, paths, svgText, found, regex, arr;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              viewBox = null;
              paths = null;
              _context.next = 4;
              return this.getSvg(this.props.src);
            case 4:
              svgText = _context.sent;
              if (!svgText) {
                _context.next = 17;
                break;
              }
              found = svgText.match(/\sviewBox=['"]([^'"]*)['"]/);
              if (found) viewBox = found[1];
              paths = [];
              regex = /\sd=['"]([^'"]*)['"]/g;
            case 10:
              if (!true) {
                _context.next = 17;
                break;
              }
              arr = regex.exec(svgText);
              if (arr) {
                _context.next = 14;
                break;
              }
              return _context.abrupt("break", 17);
            case 14:
              paths.push(arr[1]);
              _context.next = 10;
              break;
            case 17:
              if (this.isMount) this.setState({
                viewBox: viewBox,
                paths: paths
              });
            case 18:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function loadSvg() {
        return _loadSvg.apply(this, arguments);
      }
      return loadSvg;
    }()
  }, {
    key: "getSvg",
    value: function () {
      var _getSvg = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(url) {
        var result, response;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (url) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return", false);
            case 2:
              result = false;
              _context2.prev = 3;
              _context2.next = 6;
              return fetch(url, {
                method: 'GET'
              });
            case 6:
              response = _context2.sent;
              if (!response.ok) {
                _context2.next = 11;
                break;
              }
              _context2.next = 10;
              return response.text();
            case 10:
              result = _context2.sent;
            case 11:
              _context2.next = 16;
              break;
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](3);
              console.error(_context2.t0);
            case 16:
              return _context2.abrupt("return", result);
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[3, 13]]);
      }));
      function getSvg(_x) {
        return _getSvg.apply(this, arguments);
      }
      return getSvg;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        src = _this$props.src,
        viewBox = _this$props.viewBox,
        others = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      return /*#__PURE__*/_react.default.createElement(_antd.Icon, (0, _extends2.default)({
        viewBox: this.state.viewBox || viewBox
      }, others), /*#__PURE__*/_react.default.createElement("g", null, this.state.paths && this.state.paths.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement("path", {
          d: item,
          key: index
        });
      })));
    }
  }]);
  return SvgIcon;
}(_react.default.Component);
exports.default = SvgIcon;
SvgIcon.propTypes = _objectSpread(_objectSpread({}, _antd.Icon.propTypes), {}, {
  src: _propTypes.default.string // svg 图片 url, 默认不能跨域, base64('data:image/svg+xml;base64,...')格式也可以
});
SvgIcon.defaultProps = _objectSpread(_objectSpread({}, _antd.Icon.defaultProps), {}, {
  viewBox: '0 0 1024 1024'
});