"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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

var _HoldTable = _interopRequireDefault(require("../HoldTable/HoldTable"));

require("./FullTable.css");

var _excluded = ["className", "holdHeight", "headerHeight", "scroll", "pagination", "dataSource"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FullTable = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(FullTable, _React$Component);

  var _super = _createSuper(FullTable);

  function FullTable(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FullTable);
    _this = _super.call(this, props);
    _this.state = {
      pagination: {
        total: 0,
        pageSize: 20,
        current: 1,
        showSizeChanger: true,
        showTotal: function showTotal(total) {
          return '共 ' + total + ' 条记录';
        }
      },
      clientWidth: 0,
      clientHeight: 0
    };
    return _this;
  }

  (0, _createClass2.default)(FullTable, [{
    key: "renderTable",
    value: function renderTable() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          holdHeight = _this$props.holdHeight,
          headerHeight = _this$props.headerHeight,
          scroll = _this$props.scroll,
          pagination = _this$props.pagination,
          dataSource = _this$props.dataSource,
          others = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      var _this$state = this.state,
          clientWidth = _this$state.clientWidth,
          clientHeight = _this$state.clientHeight;
      holdHeight = Math.max(clientHeight - headerHeight - (pagination ? 37 : 0), holdHeight);

      var pageData = function pageData() {
        var _this2$state$paginati = _objectSpread(_objectSpread({}, _this2.state.pagination), pagination),
            current = _this2$state$paginati.current,
            pageSize = _this2$state$paginati.pageSize;

        if (!pagination || !dataSource || dataSource.length <= pageSize) return dataSource;
        return dataSource.slice((current - 1) * pageSize, current * pageSize);
      };

      return /*#__PURE__*/_react.default.createElement(_HoldTable.default, (0, _extends2.default)({
        className: "ws-full-table ".concat(className || ''),
        style: {
          maxWidth: clientWidth
        },
        holdHeight: holdHeight,
        scroll: _objectSpread({
          x: clientWidth - 16,
          y: holdHeight
        }, scroll),
        pagination: false,
        dataSource: pageData()
      }, others));
    }
  }, {
    key: "renderPagination",
    value: function renderPagination() {
      var _this3 = this;

      if (!this.props.pagination) return false;

      var onChange = function onChange(current, pageSize) {
        _this3.setState({
          pagination: Object.assign(_this3.state.pagination, {
            current: current,
            pageSize: pageSize
          })
        });

        _this3.props.pagination.onChange && _this3.props.pagination.onChange(current, pageSize);
      };

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-full-table-footer"
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          flex: 1
        }
      }), /*#__PURE__*/_react.default.createElement(_antd.Pagination, (0, _extends2.default)({}, this.state.pagination, this.props.pagination, {
        size: "small",
        onChange: onChange,
        onShowSizeChange: onChange
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var setLayout = function setLayout(v) {
        if (!v) return;
        var clientWidth = v.clientWidth,
            clientHeight = v.clientHeight;

        if (clientWidth !== _this4.state.clientWidth || clientHeight !== _this4.state.clientHeight) {
          _this4.setState({
            clientWidth: clientWidth,
            clientHeight: clientHeight
          });
        }
      };

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-full-table-container",
        ref: setLayout
      }, this.renderTable(), this.renderPagination());
    }
  }]);
  return FullTable;
}(_react.default.Component);

exports.default = FullTable;
FullTable.propTypes = _objectSpread(_objectSpread({}, _HoldTable.default.propTypes), {}, {
  // columns 必填，每一列均需要指定宽度，超出时自动滚动
  pagination: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.shape({
    // 不需要分页时传入false
    total: _propTypes.default.number,
    pageSize: _propTypes.default.number,
    current: _propTypes.default.number,
    onChange: _propTypes.default.func // (current, pageSize)

  })]),
  headerHeight: _propTypes.default.number
});
FullTable.defaultProps = _objectSpread(_objectSpread({}, _HoldTable.default.defaultProps), {}, {
  size: 'small',
  bordered: true,
  holdHeight: 200,
  // 仅在初始渲染有效
  headerHeight: 38 // 表头高度，无法自动计算，如不一致需手动调整

});