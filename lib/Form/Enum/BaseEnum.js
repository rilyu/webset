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

require("./BaseEnum.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var BaseEnum = /*#__PURE__*/function (_Field) {
  (0, _inherits2.default)(BaseEnum, _Field);

  var _super = _createSuper(BaseEnum);

  function BaseEnum(props) {
    var _this;

    (0, _classCallCheck2.default)(this, BaseEnum);
    _this = _super.call(this, props);
    _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
      loading: false,
      data: null
    });
    return _this;
  }

  (0, _createClass2.default)(BaseEnum, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _get2.default)((0, _getPrototypeOf2.default)(BaseEnum.prototype), "componentDidMount", this) && (0, _get2.default)((0, _getPrototypeOf2.default)(BaseEnum.prototype), "componentDidMount", this).call(this);
                this.loadData();

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
    key: "loadData",
    value: function () {
      var _loadData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var data;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.setState({
                  loading: true
                });
                _context2.prev = 1;
                _context2.next = 4;
                return this.fetchData();

              case 4:
                data = _context2.sent;
                if (this.props.onDataHandle) data = this.props.onDataHandle(data);
                this.setState({
                  loading: false,
                  data: data
                });
                _context2.next = 13;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](1);
                this.setState({
                  loading: false
                });
                console.error(_context2.t0);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 9]]);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", null);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function fetchData() {
        return _fetchData.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "getId",
    value: function getId(item) {
      return item && item.id;
    }
  }, {
    key: "getName",
    value: function getName(item) {
      return item && item.name;
    }
  }, {
    key: "getItem",
    value: function getItem(value) {
      var _this2 = this;

      var data = this.state.data;
      if (!data) data = [];
      if (value instanceof Array) return data.filter(function (item) {
        return value.indexOf(_this2.getId(item)) >= 0;
      });else return data.filter(function (item) {
        return _this2.getId(item) === value;
      })[0];
    }
  }, {
    key: "toString",
    value: function toString(value) {
      var _this3 = this;

      if (value instanceof Array) return value.map(function (item) {
        return _this3.toString(item);
      });
      return value !== null && value !== undefined ? value + '' : value;
    }
  }, {
    key: "toValue",
    value: function toValue(value) {
      var _this4 = this;

      if (value instanceof Array) return value.map(function (item) {
        return _this4.toValue(item);
      });
      var valueType = this.otherProps.valueType;
      if (value === null || value === undefined || valueType === 'string') return value;
      return valueType === 'bool' ? value === 'true' : parseFloat(value);
    }
  }, {
    key: "onChange",
    value: function onChange(value, option) {
      this.props.onChange && this.props.onChange(this.toValue(value), option);
    }
  }, {
    key: "renderDetail",
    value: function renderDetail() {
      var _this5 = this;

      var _this$otherProps = this.otherProps,
          value = _this$otherProps.value,
          valueType = _this$otherProps.valueType,
          readOnly = _this$otherProps.readOnly,
          selectMode = _this$otherProps.selectMode,
          loading = _this$otherProps.loading,
          onChange = _this$otherProps.onChange,
          others = (0, _objectWithoutProperties2.default)(_this$otherProps, ["value", "valueType", "readOnly", "selectMode", "loading", "onChange"]);
      if (loading === undefined) loading = this.state.loading;
      if (readOnly === undefined) readOnly = this.mergeProps.mode === 'view';
      var readOnlyProps = readOnly ? {
        open: false,
        allowClear: false
      } : {}; // value 及 Option.value 统一转为字符串，可通过 valueType 属性设定 onChange 的 value 值类型

      return /*#__PURE__*/_react.default.createElement(_antd.Select, (0, _extends2.default)({
        mode: selectMode,
        loading: loading,
        value: this.toString(value),
        onChange: function onChange(value, option) {
          return _this5.onChange(value, option);
        }
      }, others, readOnlyProps), this.state.data && this.state.data.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
          key: 'option' + index,
          value: _this5.toString(_this5.getId(item))
        }, _this5.getName(item));
      }));
    } // 支持多个 id 值

  }, {
    key: "renderValueString",
    value: function renderValueString(value) {
      var _this6 = this;

      var data = this.state.data || [];
      if (!(value instanceof Array)) value = [value];
      value = value.map(function (item) {
        return _this6.toString(item);
      });
      return value.map(function (v) {
        var item = data.filter(function (item) {
          return _this6.toString(_this6.getId(item)) === v;
        })[0];
        return item ? _this6.getName(item) : v || v === 0 ? "".concat(v) : '';
      }).join(',');
    }
  }]);
  return BaseEnum;
}(_Field2.default);

exports.default = BaseEnum;
BaseEnum.propTypes = _objectSpread(_objectSpread({}, _Field2.default.propTypes), {}, {
  valueType: _propTypes.default.oneOf(['string', 'number', 'bool']),
  selectMode: _propTypes.default.string,
  // 原 Select.mode , 名称冲突了
  readOnly: _propTypes.default.bool,
  onDataHandle: _propTypes.default.func //(data) => data , 过滤数据或增加数据项

});
BaseEnum.defaultProps = _objectSpread(_objectSpread({}, _Field2.default.defaultProps), {}, {
  valueType: 'string',
  allowClear: true,
  optionFilterProp: 'children'
});