"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _Form = _interopRequireDefault(require("../Form/Form"));
var _BaseDialog2 = _interopRequireDefault(require("../BaseDialog/BaseDialog"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FormDialog = /*#__PURE__*/function (_BaseDialog) {
  (0, _inherits2.default)(FormDialog, _BaseDialog);
  var _super = _createSuper(FormDialog);
  function FormDialog(props) {
    var _this;
    (0, _classCallCheck2.default)(this, FormDialog);
    _this = _super.call(this, props);
    _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
      verify: false,
      modified: false,
      data: {}
    });
    return _this;
  }

  //派生类必须重写此函数，成功返回 true
  (0, _createClass2.default)(FormDialog, [{
    key: "postData",
    value: function () {
      var _postData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              console.error(this.constructor.name + ' 未重写 postData() 函数');
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function postData() {
        return _postData.apply(this, arguments);
      }
      return postData;
    }()
  }, {
    key: "checkValue",
    value: function checkValue() {
      if (this.props.mode !== 'form' && !this.form) return true;
      if (!this.form) {
        console.error("this.form \u672A\u5B9A\u4E49, \u8BF7\u68C0\u67E5 ".concat(this.constructor.name, ".renderContent() \u51FD\u6570 Form \u7EC4\u4EF6\u58F0\u660E"));
        return false;
      }
      if (this.form.hasError) {
        this.setState({
          verify: true
        });
        return false;
      }
      return true;
    }
  }, {
    key: "onCancelClick",
    value: function () {
      var _onCancelClick = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _this2 = this;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (this.state.modified) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return", (0, _get2.default)((0, _getPrototypeOf2.default)(FormDialog.prototype), "onCancelClick", this).call(this));
            case 2:
              _antd.Modal.confirm({
                title: '关闭编辑窗口',
                content: '是否放弃当前修改？',
                onOk: function onOk() {
                  return (0, _get2.default)((0, _getPrototypeOf2.default)(FormDialog.prototype), "onCancelClick", _this2).call(_this2);
                },
                maskClosable: true,
                okText: '是',
                cancelText: '否'
              });
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function onCancelClick() {
        return _onCancelClick.apply(this, arguments);
      }
      return onCancelClick;
    }()
  }, {
    key: "onOkClick",
    value: function () {
      var _onOkClick = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _this3 = this;
        var success;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (this.checkValue()) {
                _context3.next = 2;
                break;
              }
              return _context3.abrupt("return");
            case 2:
              this.setState({
                submitting: true
              });
              _context3.next = 5;
              return this.postData();
            case 5:
              success = _context3.sent;
              this.setState({
                submitting: false
              }, function () {
                return success && (0, _get2.default)((0, _getPrototypeOf2.default)(FormDialog.prototype), "onOkClick", _this3).call(_this3);
              });
            case 7:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function onOkClick() {
        return _onOkClick.apply(this, arguments);
      }
      return onOkClick;
    }()
  }, {
    key: "updateData",
    value: function updateData(data, callback) {
      this.setState({
        modified: true,
        data: _objectSpread(_objectSpread({}, this.state.data), data)
      }, callback);
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this4 = this;
      return /*#__PURE__*/_react.default.createElement(_Form.default, {
        mode: this.props.mode,
        fieldProps: {
          verify: this.state.verify,
          span: 24
        },
        ref: function ref(v) {
          return _this4.form = v;
        }
      }, "renderFields here");
    }
  }]);
  return FormDialog;
}(_BaseDialog2.default);
exports.default = FormDialog;
FormDialog.defaultProps = _objectSpread(_objectSpread({}, _BaseDialog2.default.defaultProps), {}, {
  mode: 'form'
});