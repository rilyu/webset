"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _Field2 = _interopRequireDefault(require("../Field/Field"));

require("./Select.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Select = /*#__PURE__*/function (_Field) {
  (0, _inherits2.default)(Select, _Field);

  var _super = _createSuper(Select);

  function Select(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Select);
    _this = _super.call(this, props);
    _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
      loading: false,
      data: typeof props.items === 'function' ? null : props.items
    });
    return _this;
  }

  (0, _createClass2.default)(Select, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _get2.default)((0, _getPrototypeOf2.default)(Select.prototype), "componentDidMount", this) && (0, _get2.default)((0, _getPrototypeOf2.default)(Select.prototype), "componentDidMount", this).call(this);
                if (typeof this.props.items === 'function') this.loadData();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(prevProps, prevState) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                (0, _get2.default)((0, _getPrototypeOf2.default)(Select.prototype), "componentDidUpdate", this) && (0, _get2.default)((0, _getPrototypeOf2.default)(Select.prototype), "componentDidUpdate", this).call(this, prevProps, prevState);
                if (prevProps.items !== this.props.items) this.loadData();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentDidUpdate(_x, _x2) {
        return _componentDidUpdate.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
  }, {
    key: "loadData",
    value: function () {
      var _loadData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var items, data;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                items = this.props.items;

                if (!(typeof items === 'function')) {
                  _context3.next = 16;
                  break;
                }

                this.setState({
                  loading: true
                });
                _context3.prev = 3;
                _context3.next = 6;
                return items();

              case 6:
                data = _context3.sent;
                this.setState({
                  loading: false,
                  data: data
                });
                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](3);
                this.setState({
                  loading: false
                });
                console.error(_context3.t0);

              case 14:
                _context3.next = 17;
                break;

              case 16:
                this.setState({
                  data: items
                });

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 10]]);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "getItemValue",
    value: function getItemValue(item, index) {
      return this.props.getItemValue ? this.props.getItemValue(item, index) : item;
    }
  }, {
    key: "getItemText",
    value: function getItemText(item, index) {
      return this.props.getItemText ? this.props.getItemText(item, index) : item;
    }
  }, {
    key: "renderDetail",
    value: function renderDetail() {
      var _this2 = this;

      var _this$otherProps = this.otherProps,
          items = _this$otherProps.items,
          getItemValue = _this$otherProps.getItemValue,
          getItemText = _this$otherProps.getItemText,
          readOnly = _this$otherProps.readOnly,
          selectMode = _this$otherProps.selectMode,
          loading = _this$otherProps.loading,
          others = (0, _objectWithoutProperties2.default)(_this$otherProps, ["items", "getItemValue", "getItemText", "readOnly", "selectMode", "loading"]);
      if (loading === undefined) loading = this.state.loading;
      if (readOnly === undefined) readOnly = this.mergeProps.mode === 'view';
      var readOnlyProps = readOnly ? {
        open: false,
        allowClear: false
      } : {};
      return /*#__PURE__*/_react.default.createElement(_antd.Select, (0, _extends2.default)({
        mode: selectMode,
        loading: loading
      }, others, readOnlyProps), this.state.data && this.state.data.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
          key: 'option' + index,
          value: _this2.getItemValue(item, index)
        }, _this2.getItemText(item, index));
      }));
    }
  }, {
    key: "renderValueString",
    value: function renderValueString(value) {
      var data = this.state.data;

      for (var i in data || []) {
        if (this.getItemValue(data[i], i) === value) return this.getItemText(data[i], i);
      }

      return '';
    }
  }]);
  return Select;
}(_Field2.default);

exports.default = Select;
Select.propTypes = _objectSpread(_objectSpread({}, _Field2.default.propTypes), {}, {
  selectMode: _propTypes.default.string,
  // 原 Select.mode , 名称冲突了
  readOnly: _propTypes.default.bool,
  items: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.func]),
  getItemValue: _propTypes.default.func,
  //(item, index) 选择项值，item=items[index]，为空时直接使用item
  getItemText: _propTypes.default.func //(item, index) 选择项显示文本，item=items[index]，为空时直接使用item

});
Select.defaultProps = _objectSpread(_objectSpread({}, _Field2.default.defaultProps), {}, {
  allowClear: true
});