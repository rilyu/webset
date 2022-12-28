"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
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
var _propTypes = _interopRequireDefault(require("prop-types"));
var _antd = require("antd");
var _Field2 = _interopRequireDefault(require("../Field/Field"));
require("./BaseEnum.css");
var _excluded = ["value", "valueType", "readOnly", "selectMode", "pageSize", "loading", "autoClearSearchValue", "onChange", "onSearch", "onSelect"],
  _excluded2 = ["value", "valueType", "readOnly", "selectMode", "pageSize", "loading", "optionLabelProp", "onChange", "onSearch"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
      data: null,
      searchValue: null,
      pageIndex: 0
    });
    return _this;
  }
  (0, _createClass2.default)(BaseEnum, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              (0, _get2.default)((0, _getPrototypeOf2.default)(BaseEnum.prototype), "componentDidMount", this) && (0, _get2.default)((0, _getPrototypeOf2.default)(BaseEnum.prototype), "componentDidMount", this).call(this);
              this.loadData();
            case 2:
            case "end":
              return _context.stop();
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
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              this.setState({
                loading: true
              });
              _context2.prev = 1;
              _context2.next = 4;
              return this.fetchData();
            case 4:
              data = _context2.sent;
              if (this.isMount) {
                if (this.props.onDataHandle) data = this.props.onDataHandle(data);
                this.setState({
                  loading: false,
                  data: data,
                  searchValue: null,
                  pageIndex: 0
                });
              }
              _context2.next = 12;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              this.isMount && this.setState({
                loading: false
              });
              console.error(_context2.t0);
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[1, 8]]);
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
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", null);
            case 1:
            case "end":
              return _context3.stop();
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
    key: "onSearch",
    value: function onSearch(searchValue) {
      var _this5 = this;
      this.setState({
        searchValue: searchValue,
        pageIndex: 0
      }, function () {
        return _this5.props.onSearch && _this5.props.onSearch(searchValue);
      });
    }
  }, {
    key: "renderOptions",
    value: function renderOptions(Option) {
      var _this6 = this;
      var pageSize = this.props.pageSize;
      var _this$state = this.state,
        data = _this$state.data,
        searchValue = _this$state.searchValue,
        pageIndex = _this$state.pageIndex;
      if (!data) data = [];
      if (searchValue) {
        searchValue = searchValue.toLowerCase();
        data = data.filter(function (item) {
          return (_this6.getName(item) || '').toLowerCase().indexOf(searchValue) >= 0;
        });
      }
      var pageCount = 0;
      if (pageSize > 0) {
        pageCount = Math.ceil(data.length / pageSize);
        if (pageIndex >= pageCount) pageIndex = pageCount - 1;
        if (pageIndex < 0) pageIndex = 0;
        data = data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
      }
      var options = data.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement(Option, {
          key: 'option' + index,
          value: _this6.toString(_this6.getId(item)),
          item: item
        }, _this6.getName(item));
      });
      if (pageCount > 1) {
        options.push( /*#__PURE__*/_react.default.createElement(Option, {
          key: "pagination",
          className: "ws-select-pagination",
          disabled: true
        }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
          type: "link",
          size: "small",
          icon: "vertical-right",
          disabled: pageIndex === 0,
          onClick: function onClick() {
            return _this6.setState({
              pageIndex: 0
            });
          }
        }), /*#__PURE__*/_react.default.createElement(_antd.Button, {
          type: "link",
          size: "small",
          icon: "left",
          disabled: pageIndex === 0,
          onClick: function onClick() {
            return _this6.setState({
              pageIndex: pageIndex - 1
            });
          }
        }), /*#__PURE__*/_react.default.createElement(_antd.Button, {
          type: "link",
          size: "small",
          icon: "right",
          disabled: pageIndex >= pageCount - 1,
          onClick: function onClick() {
            return _this6.setState({
              pageIndex: pageIndex + 1
            });
          }
        }), /*#__PURE__*/_react.default.createElement(_antd.Button, {
          type: "link",
          size: "small",
          icon: "vertical-left",
          disabled: pageIndex >= pageCount - 1,
          onClick: function onClick() {
            return _this6.setState({
              pageIndex: pageCount - 1
            });
          }
        })));
      }
      return options;
    }
  }, {
    key: "renderSelect",
    value: function renderSelect() {
      var _this7 = this;
      var _this$otherProps = this.otherProps,
        value = _this$otherProps.value,
        valueType = _this$otherProps.valueType,
        readOnly = _this$otherProps.readOnly,
        selectMode = _this$otherProps.selectMode,
        pageSize = _this$otherProps.pageSize,
        loading = _this$otherProps.loading,
        autoClearSearchValue = _this$otherProps.autoClearSearchValue,
        onChange = _this$otherProps.onChange,
        onSearch = _this$otherProps.onSearch,
        _onSelect = _this$otherProps.onSelect,
        others = (0, _objectWithoutProperties2.default)(_this$otherProps, _excluded);
      if (loading === undefined) loading = this.state.loading;
      if (readOnly === undefined) readOnly = this.mergeProps.mode === 'view';
      var readOnlyProps = readOnly ? {
        open: false,
        allowClear: false
      } : {};
      // value 及 Option.value 统一转为字符串，可通过 valueType 属性设定 onChange 的 value 值类型
      return /*#__PURE__*/_react.default.createElement(_antd.Select, (0, _extends2.default)({
        mode: selectMode,
        loading: loading,
        autoClearSearchValue: autoClearSearchValue,
        value: this.toString(value),
        onChange: function onChange(value, option) {
          return _this7.onChange(value, option);
        },
        onSearch: function onSearch(value) {
          return _this7.onSearch(value);
        },
        onSelect: function onSelect(value, option) {
          if (autoClearSearchValue === undefined || autoClearSearchValue) _this7.setState({
            searchValue: null
          });
          _onSelect && _onSelect(value, option);
        }
      }, others, readOnlyProps), this.renderOptions(_antd.Select.Option));
    }
  }, {
    key: "renderCombobox",
    value: function renderCombobox() {
      var _this8 = this;
      var _this$otherProps2 = this.otherProps,
        value = _this$otherProps2.value,
        valueType = _this$otherProps2.valueType,
        readOnly = _this$otherProps2.readOnly,
        selectMode = _this$otherProps2.selectMode,
        pageSize = _this$otherProps2.pageSize,
        loading = _this$otherProps2.loading,
        optionLabelProp = _this$otherProps2.optionLabelProp,
        onChange = _this$otherProps2.onChange,
        onSearch = _this$otherProps2.onSearch,
        others = (0, _objectWithoutProperties2.default)(_this$otherProps2, _excluded2);
      if (loading === undefined) loading = this.state.loading;
      if (readOnly === undefined) readOnly = this.mergeProps.mode === 'view';
      var readOnlyProps = readOnly ? {
        open: false,
        allowClear: false
      } : {};
      // value 及 Option.value 统一转为字符串，可通过 valueType 属性设定 onChange 的 value 值类型
      return /*#__PURE__*/_react.default.createElement(_antd.AutoComplete, (0, _extends2.default)({
        loading: loading,
        optionLabelProp: "value",
        value: this.toString(value),
        onChange: function onChange(value, option) {
          return _this8.onChange(value, option);
        },
        onSearch: function onSearch(value) {
          return _this8.onSearch(value);
        }
      }, others, readOnlyProps), this.renderOptions(_antd.Select.Option));
    }
  }, {
    key: "renderDetail",
    value: function renderDetail() {
      return this.otherProps.selectMode === 'combobox' ? this.renderCombobox() : this.renderSelect();
    }

    // 支持多个 id 值
  }, {
    key: "renderValueString",
    value: function renderValueString(value) {
      var _this9 = this;
      var data = this.state.data || [];
      if (!(value instanceof Array)) value = [value];
      value = value.map(function (item) {
        return _this9.toString(item);
      });
      return value.map(function (v) {
        var item = data.filter(function (item) {
          return _this9.toString(_this9.getId(item)) === v;
        })[0];
        return item ? _this9.getName(item) : v || v === 0 ? "".concat(v) : '';
      }).join(',');
    }
  }]);
  return BaseEnum;
}(_Field2.default);
exports.default = BaseEnum;
BaseEnum.propTypes = _objectSpread(_objectSpread({}, _Field2.default.propTypes), {}, {
  valueType: _propTypes.default.oneOf(['string', 'number', 'bool']),
  selectMode: _propTypes.default.string,
  // 原 Select.mode , 名称冲突了，增加 combobox 模式采用 AutoComplete 实现
  pageSize: _propTypes.default.number,
  // 默认为 0 不分页
  readOnly: _propTypes.default.bool,
  onDataHandle: _propTypes.default.func //(data) => data , 过滤数据或增加数据项
});
BaseEnum.defaultProps = _objectSpread(_objectSpread({}, _Field2.default.defaultProps), {}, {
  valueType: 'string',
  allowClear: true,
  optionFilterProp: 'children',
  pageSize: 0
});