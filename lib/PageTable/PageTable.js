"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _HoldTable = _interopRequireDefault(require("../HoldTable/HoldTable"));

var _excluded = ["defaultPageSize", "autoLoadData", "onLoadData", "title", "dataSource", "rowSelection", "pagination", "onChange"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PageTable = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(PageTable, _React$Component);

  var _super = _createSuper(PageTable);

  function PageTable(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PageTable);
    _this = _super.call(this, props);
    _this.state = {
      loading: false,
      rows: null,
      pagination: {
        pageSize: props.defaultPageSize,
        current: 0,
        showSizeChanger: true,
        showTotal: function showTotal(total) {
          return '共 ' + total + ' 条记录';
        }
      },
      selectedRowKeys: [],
      selectedRows: []
    };
    return _this;
  }

  (0, _createClass2.default)(PageTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.autoLoadData) this.loadData();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (!this.props.onStateChange) return;

      if (prevState.loading !== this.state.loading || prevState.selectedRowKeys.length !== this.state.selectedRowKeys.length || !prevState.selectedRowKeys.every(function (item, index) {
        return item === _this2.state.selectedRowKeys[index];
      })) {
        var _this$state = this.state,
            loading = _this$state.loading,
            selectedRows = _this$state.selectedRows,
            selectedRowKeys = _this$state.selectedRowKeys;
        this.props.onStateChange(loading, selectedRows, selectedRowKeys);
      }
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var forceLoad,
            _this$state$paginatio,
            pageSize,
            current,
            pageNumber,
            _yield$this$props$onL,
            success,
            rows,
            total,
            _this$state2,
            pagination,
            selectedRowKeys,
            selectedRows,
            _args = arguments;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                forceLoad = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
                this.setState({
                  loading: true
                });
                _context.prev = 2;
                _this$state$paginatio = this.state.pagination, pageSize = _this$state$paginatio.pageSize, current = _this$state$paginatio.current;
                pageNumber = current ? current - 1 : 0;

                if (!(!forceLoad && !this.props.paginationLoadData && pageNumber !== 0)) {
                  _context.next = 9;
                  break;
                }

                this.setState({
                  selectedRowKeys: [],
                  selectedRows: []
                });
                _context.next = 16;
                break;

              case 9:
                _context.next = 11;
                return this.props.onLoadData(pageNumber, pageSize);

              case 11:
                _yield$this$props$onL = _context.sent;
                success = _yield$this$props$onL.success;
                rows = _yield$this$props$onL.rows;
                total = _yield$this$props$onL.total;

                if (success) {
                  _this$state2 = this.state, pagination = _this$state2.pagination, selectedRowKeys = _this$state2.selectedRowKeys, selectedRows = _this$state2.selectedRows;
                  pagination.total = total || 0;
                  rows = (rows || []).map(function (item, index) {
                    return _objectSpread({
                      rowKey: "".concat(pageNumber, "-").concat(index)
                    }, item);
                  });
                  selectedRowKeys = selectedRowKeys.filter(function (key) {
                    return rows.some(function (row) {
                      return row.rowKey === key;
                    });
                  });
                  selectedRows = selectedRowKeys.map(function (key) {
                    return rows.filter(function (row) {
                      return row.rowKey === key;
                    })[0];
                  });
                  this.setState({
                    rows: rows,
                    pagination: pagination,
                    selectedRowKeys: selectedRowKeys,
                    selectedRows: selectedRows
                  });
                }

              case 16:
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](2);
                console.error(_context.t0);

              case 21:
                this.setState({
                  loading: false
                });

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 18]]);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "reload",
    value: function reload() {
      this.loadData(true);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var _this3 = this;

      var pagination = this.state.pagination;
      pagination.current = 1;
      this.setState({
        pagination: pagination
      }, function () {
        return _this3.loadData();
      });
    }
  }, {
    key: "onChange",
    value: function onChange(pagination) {
      var _this4 = this,
          _this$props;

      this.setState({
        pagination: pagination
      }, function () {
        return _this4.loadData();
      });

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.props.onChange && (_this$props = this.props).onChange.apply(_this$props, [pagination].concat(args));
    }
  }, {
    key: "rowSelection",
    value: function rowSelection() {
      var _this5 = this;

      var rowSelection = this.props.rowSelection;
      var saveOnChange = rowSelection && rowSelection.onChange;
      return _objectSpread(_objectSpread({
        type: 'radio',
        columnWidth: 32,
        selectedRowKeys: this.state.selectedRowKeys
      }, rowSelection), {}, {
        onChange: function onChange(selectedRowKeys, selectedRows) {
          _this5.setState({
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
          }, function () {
            return saveOnChange && saveOnChange(selectedRowKeys, selectedRows);
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$props2 = this.props,
          defaultPageSize = _this$props2.defaultPageSize,
          autoLoadData = _this$props2.autoLoadData,
          onLoadData = _this$props2.onLoadData,
          title = _this$props2.title,
          dataSource = _this$props2.dataSource,
          rowSelection = _this$props2.rowSelection,
          pagination = _this$props2.pagination,
          onChange = _this$props2.onChange,
          others = (0, _objectWithoutProperties2.default)(_this$props2, _excluded);
      var _this$state3 = this.state,
          loading = _this$state3.loading,
          selectedRows = _this$state3.selectedRows,
          selectedRowKeys = _this$state3.selectedRowKeys;
      return /*#__PURE__*/_react.default.createElement(_HoldTable.default, (0, _extends2.default)({
        title: typeof title === 'function' ? function () {
          return title(loading, selectedRows, selectedRowKeys);
        } : title,
        dataSource: this.state.rows,
        rowSelection: this.rowSelection(),
        pagination: this.state.pagination,
        onChange: function onChange(pagination) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          return _this6.onChange.apply(_this6, [pagination].concat(args));
        }
      }, others));
    }
  }]);
  return PageTable;
}(_react.default.Component);

exports.default = PageTable;
PageTable.propTypes = _objectSpread(_objectSpread({}, _HoldTable.default.propTypes), {}, {
  // columns 必填, title 选填
  title: _propTypes.default.func,
  // (loading, selectedRows, selectedRowKeys)
  defaultPageSize: _propTypes.default.number,
  // 默认每页记录数
  autoLoadData: _propTypes.default.bool,
  // 是否自动加载数据
  paginationLoadData: _propTypes.default.bool,
  // 是否分页加载数据
  onLoadData: _propTypes.default.func.isRequired,
  // async (pageNumber, pageSize), return {success, rows, total}
  onStateChange: _propTypes.default.func // (loading, selectedRows, selectedRowKeys)

});
PageTable.defaultProps = _objectSpread(_objectSpread({}, _HoldTable.default.defaultProps), {}, {
  size: 'small',
  bordered: true,
  rowKey: 'rowKey',
  defaultPageSize: 20,
  autoLoadData: true,
  paginationLoadData: true
});