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

var _AppContext = _interopRequireDefault(require("../AppContext/AppContext"));

var _AppProvider = _interopRequireDefault(require("../AppContext/AppProvider"));

require("./BaseDialog.css");

var _excluded = ["mode", "fullMode", "title", "footer", "okText", "cancelText", "closeText", "onOk", "onCancel", "visible", "wrapClassName", "children"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var BaseDialog = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(BaseDialog, _React$Component);

  var _super = _createSuper(BaseDialog);

  function BaseDialog(props) {
    var _this;

    (0, _classCallCheck2.default)(this, BaseDialog);
    _this = _super.call(this, props);
    _this.state = {
      closed: false,
      visible: true,
      loading: false,
      // 查询数据中，仅在派生类中设置，派生类可重写 renderLoading ，可用于查询按钮、Table等，勿用于关闭、确认等按钮
      submitting: false,
      // 提交数据中，可用于提交、确认按钮
      cancelling: false // 取消操作中，可用于取消、关闭按钮

    };
    return _this;
  }

  (0, _createClass2.default)(BaseDialog, [{
    key: "close",
    value: function close() {
      this.setState({
        closed: true,
        visible: false
      });
    }
  }, {
    key: "onCancelClick",
    value: function () {
      var _onCancelClick = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.state.cancelling) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                if (!this.props.onCancel) {
                  _context.next = 10;
                  break;
                }

                this.setState({
                  cancelling: true
                });
                _context.next = 6;
                return this.props.onCancel();

              case 6:
                result = _context.sent;
                this.setState({
                  cancelling: false
                });

                if (!(result === false)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return");

              case 10:
                this.close();

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onCancelClick() {
        return _onCancelClick.apply(this, arguments);
      }

      return onCancelClick;
    }()
  }, {
    key: "onOkClick",
    value: function () {
      var _onOkClick = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var result;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.state.submitting) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                if (!this.props.onOk) {
                  _context2.next = 10;
                  break;
                }

                this.setState({
                  submitting: true
                });
                _context2.next = 6;
                return this.props.onOk();

              case 6:
                result = _context2.sent;
                this.setState({
                  submitting: false
                });

                if (!(result === false)) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return");

              case 10:
                this.close();

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onOkClick() {
        return _onOkClick.apply(this, arguments);
      }

      return onOkClick;
    }()
  }, {
    key: "renderTitle",
    value: function renderTitle() {
      var title = this.props.title;
      return typeof title === 'function' ? title(this) : title;
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var _this2 = this;

      var _this$props = this.props,
          mode = _this$props.mode,
          footer = _this$props.footer,
          okText = _this$props.okText,
          okType = _this$props.okType,
          cancelText = _this$props.cancelText,
          closeText = _this$props.closeText;
      var _this$state = this.state,
          submitting = _this$state.submitting,
          cancelling = _this$state.cancelling;
      if (typeof footer === 'function') return footer(this);else if (footer !== undefined) return footer;

      if (mode === 'view') {
        return [/*#__PURE__*/_react.default.createElement(_antd.Button, {
          key: "ok",
          type: okType,
          loading: cancelling,
          onClick: function onClick() {
            return _this2.onCancelClick();
          }
        }, closeText)];
      } else {
        return [/*#__PURE__*/_react.default.createElement(_antd.Button, {
          key: "cancel",
          disabled: cancelling,
          onClick: function onClick() {
            return _this2.onCancelClick();
          }
        }, cancelText), /*#__PURE__*/_react.default.createElement(_antd.Button, {
          key: "ok",
          type: okType,
          loading: submitting,
          onClick: function onClick() {
            return _this2.onOkClick();
          }
        }, okText)];
      }
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      return this.props.children;
    }
  }, {
    key: "renderLoading",
    value: function renderLoading() {
      var loading = this.state.loading;
      if (!loading) return null;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-dialog-loading"
      }, /*#__PURE__*/_react.default.createElement(_antd.Spin, {
        delay: 1000
      }));
    }
  }, {
    key: "renderIcon",
    value: function renderIcon() {
      if (this.props.mode !== 'confirm') return false;
      return /*#__PURE__*/_react.default.createElement(_antd.Icon, {
        type: "question-circle",
        className: "ws-dialog-confirm-icon"
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          mode = _this$props2.mode,
          fullMode = _this$props2.fullMode,
          title = _this$props2.title,
          footer = _this$props2.footer,
          okText = _this$props2.okText,
          cancelText = _this$props2.cancelText,
          closeText = _this$props2.closeText,
          onOk = _this$props2.onOk,
          onCancel = _this$props2.onCancel,
          visible = _this$props2.visible,
          wrapClassName = _this$props2.wrapClassName,
          children = _this$props2.children,
          others = (0, _objectWithoutProperties2.default)(_this$props2, _excluded);
      return /*#__PURE__*/_react.default.createElement(_antd.Modal, (0, _extends2.default)({
        visible: this.state.visible,
        title: this.renderTitle(),
        footer: this.renderFooter(),
        wrapClassName: "ws-dialog ".concat(fullMode ? 'ws-dialog-full' : '', " ").concat(wrapClassName || ''),
        onCancel: function onCancel() {
          return _this3.onCancelClick();
        }
      }, others), /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-dialog-content-container"
      }, this.renderIcon(), this.renderContent(), this.renderLoading()));
    }
  }], [{
    key: "show",
    value: function show(options) {
      var _this4 = this;

      var dialog, key;

      var renderElement = function renderElement(props) {
        return /*#__PURE__*/_react.default.createElement(_this4.prototype.constructor, (0, _extends2.default)({}, props, {
          afterClose: function afterClose() {
            dialog && dialog.state.closed && _AppProvider.default.remove(key);
            props && props.afterClose && props.afterClose();
          },
          ref: function ref(v) {
            return dialog = v;
          }
        }));
      };

      key = _AppProvider.default.add(renderElement(options));
      return {
        key: key,
        close: function close() {
          return dialog && dialog.close();
        },
        update: function update(props) {
          return _AppProvider.default.update(key, renderElement(props));
        }
      };
    }
  }]);
  return BaseDialog;
}(_react.default.Component);

exports.default = BaseDialog;
BaseDialog.contextType = _AppContext.default;
BaseDialog.propTypes = _objectSpread(_objectSpread({}, _antd.Modal.propTypes), {}, {
  mode: _propTypes.default.oneOf(['form', 'edit', 'view', 'confirm']),
  // 注意 form 没有 confirm
  fullMode: _propTypes.default.bool,
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element, _propTypes.default.func]),
  // func: (dialog)，可调用 dialog.close 或其它函数，不需要 title 时传入 null
  footer: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element, _propTypes.default.func]),
  // func: (dialog)，可调用 dialog.close 或其它函数，不需要 footer 时传入 null
  closeText: _propTypes.default.string,
  // okText/cancelText 在 Modal 中定义
  onOk: _propTypes.default.func,
  // async (dialog) ，返回 false 时不关闭对话框
  onCancel: _propTypes.default.func // async (dialog) ，返回 false 时不关闭对话框，关闭按钮也使用 onCancel

});
BaseDialog.defaultProps = _objectSpread(_objectSpread({}, _antd.Modal.defaultProps), {}, {
  closable: true,
  width: 520,
  maskClosable: true,
  okText: '确认',
  cancelText: '取消',
  mode: 'view',
  fullMode: false,
  closeText: '关闭'
});