"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

require("./HoldTable.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var HoldTable = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(HoldTable, _React$Component);

  var _super = _createSuper(HoldTable);

  function HoldTable(props) {
    var _this;

    (0, _classCallCheck2.default)(this, HoldTable);
    _this = _super.call(this, props);
    _this.state = {
      paginationHeight: 0
    };

    _this.FillTable = function (props) {
      var changeBodyHeight = function changeBodyHeight(v) {
        if (v && v.parentNode) {
          var _this$props = _this.props,
              holdHeight = _this$props.holdHeight,
              dataSource = _this$props.dataSource;
          var paginationHeight = _this.state.paginationHeight;
          var hasData = dataSource && dataSource.length > 0;
          v.parentNode.style.minHeight = hasData && holdHeight > 0 ? "".concat(holdHeight - paginationHeight, "px") : '';
        }
      };

      return /*#__PURE__*/_react.default.createElement("table", (0, _extends2.default)({}, props, {
        ref: function ref(v) {
          return changeBodyHeight(v);
        }
      }));
    };

    return _this;
  }

  (0, _createClass2.default)(HoldTable, [{
    key: "getNodeHeight",
    value: function getNodeHeight(node) {
      if (!node) return 0;
      var style = window.getComputedStyle(node);
      var height = parseFloat(style.getPropertyValue('height'));
      var marginTop = parseFloat(style.getPropertyValue('margin-top'));
      var marginBottom = parseFloat(style.getPropertyValue('margin-bottom'));
      return height + marginTop + marginBottom;
    }
  }, {
    key: "renderEmpty",
    value: function renderEmpty() {
      var _this2 = this;

      var _this$props2 = this.props,
          locale = _this$props2.locale,
          holdHeight = _this$props2.holdHeight;

      var changePlaceholderHeight = function changePlaceholderHeight(v) {
        if (v && v.parentNode && v.parentNode.previousSibling && holdHeight > 0) {
          var marginTop = -1; //查出来的不对，写死

          var siblingHeight = _this2.getNodeHeight(v.parentNode.previousSibling);

          v.parentNode.style.height = "".concat(holdHeight - marginTop - siblingHeight, "px");
        }
      };

      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(v) {
          return changePlaceholderHeight(v);
        }
      }, locale && locale.emptyText ? locale.emptyText : /*#__PURE__*/_react.default.createElement(_antd.Empty, {
        image: _antd.Empty.PRESENTED_IMAGE_SIMPLE
      }));
    }
  }, {
    key: "onRow",
    value: function onRow(record, index) {
      var _this3 = this;

      var _this$props3 = this.props,
          dataSource = _this$props3.dataSource,
          rowKey = _this$props3.rowKey,
          rowSelection = _this$props3.rowSelection,
          rangeSelect = _this$props3.rangeSelect;

      var _ref = this.props.onRow ? this.props.onRow(record, index) : {},
          _onClick = _ref.onClick,
          others = (0, _objectWithoutProperties2.default)(_ref, ["onClick"]);

      var clearTextSelection = function clearTextSelection() {
        if (window.getSelection) {
          if (window.getSelection().empty) window.getSelection().empty(); // Chrome
          else if (window.getSelection().removeAllRanges) window.getSelection().removeAllRanges(); // Firefox
        } else if (document.selection && document.selection.empty) {
          // IE
          document.selection.empty();
        }
      };

      return _objectSpread(_objectSpread({}, others), {}, {
        onClick: function onClick(e) {
          if (rangeSelect && e.shiftKey && _this3.startIndex !== undefined && _this3.startDataSource === dataSource) {
            var selectedRowKeys = [],
                selectedRows = [];
            var startIndex = Math.min(_this3.startIndex, index),
                endIndex = Math.max(_this3.startIndex, index);

            for (var i = startIndex; i <= endIndex; i++) {
              selectedRowKeys.push(dataSource[i][rowKey]);
              selectedRows.push(dataSource[i]);
            }

            rowSelection && rowSelection.onChange && rowSelection.onChange(selectedRowKeys, selectedRows);
            clearTextSelection();
          } else {
            _this3.startIndex = index;
            _this3.startDataSource = dataSource;
            rowSelection && rowSelection.onChange && rowSelection.onChange([record[rowKey]], [record]);
          }

          _onClick && _onClick(e);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props4 = this.props,
          className = _this$props4.className,
          components = _this$props4.components,
          locale = _this$props4.locale,
          rowSelection = _this$props4.rowSelection,
          rangeSelect = _this$props4.rangeSelect,
          onRow = _this$props4.onRow,
          others = (0, _objectWithoutProperties2.default)(_this$props4, ["className", "components", "locale", "rowSelection", "rangeSelect", "onRow"]);

      var calcHeight = function calcHeight(v) {
        if (!v) return;

        var domNode = _reactDom.default.findDOMNode(v);

        var paginationHeight = Math.floor(_this4.getNodeHeight(domNode.querySelector('ul.ant-pagination.ant-table-pagination')));
        if (paginationHeight !== _this4.state.paginationHeight) _this4.setState({
          paginationHeight: paginationHeight
        });
      };

      return /*#__PURE__*/_react.default.createElement(_antd.Table, (0, _extends2.default)({}, others, {
        className: "ws-hold-table ".concat(className || ''),
        components: _objectSpread(_objectSpread({}, components), {}, {
          table: this.FillTable
        }),
        locale: _objectSpread(_objectSpread({}, locale), {}, {
          emptyText: this.renderEmpty()
        }),
        rowSelection: rangeSelect ? _objectSpread(_objectSpread({}, rowSelection), {}, {
          type: 'checkbox'
        }) : rowSelection,
        onRow: function onRow(record, index) {
          return _this4.onRow(record, index);
        },
        ref: function ref(v) {
          return calcHeight(v);
        }
      }));
    }
  }]);
  return HoldTable;
}(_react.default.Component);

exports.default = HoldTable;
HoldTable.propTypes = _objectSpread(_objectSpread({}, _antd.Table.propTypes), {}, {
  holdHeight: _propTypes.default.number,
  // 如果指定了 holdHeight 则自动预占该高度，使得数据少且有滚动条的表格更加美观
  rangeSelect: _propTypes.default.bool // 范围选择，设为 true 会自动开启多选(rowSelection.type = 'checkbox')，支持 shift 范围选择

});
HoldTable.defaultProps = _objectSpread(_objectSpread({}, _antd.Table.defaultProps), {}, {
  holdHeight: 0,
  rangeSelect: false
});