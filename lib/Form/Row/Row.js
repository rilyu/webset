"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _antd = require("antd");
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Row = /*#__PURE__*/function (_AntRow) {
  (0, _inherits2.default)(Row, _AntRow);
  var _super = _createSuper(Row);
  function Row() {
    (0, _classCallCheck2.default)(this, Row);
    return _super.apply(this, arguments);
  }
  (0, _createClass2.default)(Row, [{
    key: "render",
    value: function render() {
      return (0, _get2.default)((0, _getPrototypeOf2.default)(Row.prototype), "render", this).call(this);
    }
  }]);
  return Row;
}(_antd.Row);
exports.default = Row;
Row.defaultProps = {
  type: 'flex',
  align: 'top',
  // top middle bottom
  gutter: 0,
  justify: 'start' // start end center space-around space-between
};