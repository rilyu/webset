"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _HoldTable = _interopRequireDefault(require("../HoldTable/HoldTable"));

require("./EditTable.css");

var _excluded = ["placeholder", "disabled", "autoFocus"],
    _excluded2 = ["onCell", "render", "renderEdit"],
    _excluded3 = ["onClick"],
    _excluded4 = ["onChange"],
    _excluded5 = ["className", "onDoubleClick", "onKeyDown"],
    _excluded6 = ["className", "columns", "dataSource", "rowSelection", "onRow"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var EditTable = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(EditTable, _React$Component);

  var _super = _createSuper(EditTable);

  function EditTable(props) {
    var _this;

    (0, _classCallCheck2.default)(this, EditTable);
    _this = _super.call(this, props);
    _this.state = {
      dataSource: props.dataSource,
      selectedRowKeys: [],
      editingRowKey: null
    };
    _this.editingColumnIndex = null;
    return _this;
  }

  (0, _createClass2.default)(EditTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('mousedown', this.checkExitEditing.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('mousedown', this.checkExitEditing);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.dataSource !== prevProps.dataSource) {
        this.setState({
          dataSource: this.props.dataSource
        });
      }

      if (JSON.stringify(this.state.selectedRowKeys) !== JSON.stringify(prevState.selectedRowKeys) || this.state.editingRowKey !== prevState.editingRowKey) {
        this.props.onStateChange && this.props.onStateChange(this.state.selectedRowKeys, this.state.editingRowKey);
      }
    }
  }, {
    key: "exitEditing",
    get: function get() {
      return _objectSpread({
        pressEscape: true,
        pressEnter: false,
        clickOutside: true,
        changeRow: true
      }, this.props.exitEditing);
    }
  }, {
    key: "checkExitEditing",
    value: function checkExitEditing(e) {
      var findCommonParent = function findCommonParent(node1, node2) {
        while (node1 = node1.parentNode) {
          if (node1.contains(node2)) return node1;
        }

        return null;
      };

      if (this.state.editingRowKey && this.exitEditing.clickOutside) {
        var node = _reactDom.default.findDOMNode(this); // 点击在表格之外并且共同祖先不是body，确保点击在 Modal 、 DropDown 等浮层不会关闭编辑状态


        if (!node.contains(e.target) && findCommonParent(node, e.target) !== document.body) {
          this.setState({
            editingRowKey: null
          });
        }
      }
    }
  }, {
    key: "editRow",
    value: function editRow(rowKey) {
      this.setState({
        selectedRowKeys: [rowKey],
        editingRowKey: rowKey
      });
    }
  }, {
    key: "selectRows",
    value: function selectRows(selectedRowKeys, selectedRows) {
      var _this$state = this.state,
          editingRowKey = _this$state.editingRowKey,
          dataSource = _this$state.dataSource;

      if (selectedRowKeys.length === 0 || selectedRowKeys[0] !== this.state.selectedRowKeys[0] && this.exitEditing.changeRow) {
        editingRowKey = null;
      }

      if (editingRowKey !== null && selectedRowKeys.length > 0) {
        var _this$props = this.props,
            rowKey = _this$props.rowKey,
            editQuery = _this$props.editQuery;
        var keepEditing = !editQuery;

        if (editQuery && dataSource) {
          for (var i = 0; i < dataSource.length; i++) {
            if (dataSource[i][rowKey] === selectedRowKeys[0]) {
              keepEditing = editQuery(dataSource[i], i);
              break;
            }
          }
        }

        editingRowKey = keepEditing ? selectedRowKeys[0] : null;
      }

      this.setState({
        selectedRowKeys: selectedRowKeys,
        editingRowKey: editingRowKey
      });
    }
  }, {
    key: "cloneEditElement",
    value: function cloneEditElement(element, column, columnIndex) {
      var _element$props = element.props,
          placeholder = _element$props.placeholder,
          disabled = _element$props.disabled,
          autoFocus = _element$props.autoFocus,
          others = (0, _objectWithoutProperties2.default)(_element$props, _excluded);

      var getElementText = function getElementText(element) {
        if (!element) return '';
        if (typeof element === 'string') return element;
        var children = (element.props.children instanceof Array ? element.props.children : [element.props.children]).filter(Boolean);
        return children.map(function (item) {
          return getElementText(item);
        }).join('');
      };

      if (placeholder === undefined && !disabled) placeholder = "\u8BF7\u8F93\u5165".concat(getElementText(column.title));
      if (autoFocus === undefined) autoFocus = columnIndex === this.editingColumnIndex || this.editingColumnIndex === null && columnIndex === 0;
      return /*#__PURE__*/_react.default.cloneElement(element, _objectSpread(_objectSpread({}, others), {}, {
        placeholder: placeholder,
        disabled: disabled,
        autoFocus: autoFocus
      }));
    }
  }, {
    key: "convertColumns",
    value: function convertColumns(columns) {
      var _this2 = this;

      var _this$props2 = this.props,
          rowKey = _this$props2.rowKey,
          defaultEditAble = _this$props2.defaultEditAble,
          defaultValueChange = _this$props2.defaultValueChange;
      var _this$state2 = this.state,
          dataSource = _this$state2.dataSource,
          editingRowKey = _this$state2.editingRowKey;
      return columns && columns.map(function (column, columnIndex) {
        var _onCell = column.onCell,
            _render = column.render,
            renderEdit = column.renderEdit,
            others = (0, _objectWithoutProperties2.default)(column, _excluded2);
        return _objectSpread(_objectSpread({}, others), {}, {
          onCell: function onCell(record, index) {
            var _ref = _onCell ? _onCell(record, index) : {},
                _onClick = _ref.onClick,
                others = (0, _objectWithoutProperties2.default)(_ref, _excluded3);

            return _objectSpread(_objectSpread({}, others), {}, {
              onClick: function onClick(e) {
                _this2.editingColumnIndex = columnIndex;
                _onClick && _onClick(e);
              }
            });
          },
          render: function render(text, record, index) {
            var defaultRender = function defaultRender() {
              var element = _render ? _render(text, record, index) : text;
              return record[rowKey] === editingRowKey ? /*#__PURE__*/_react.default.createElement("div", {
                className: "ws-edit-cell-static"
              }, element) : element;
            };

            if (record[rowKey] !== editingRowKey) return defaultRender(); // 非编辑行

            if (renderEdit === false) return defaultRender(); // 指定本列不能编辑

            if (!renderEdit && !defaultEditAble) return defaultRender(); // 未设置 renderEdit 且默认不能编辑

            if (typeof renderEdit === 'function') {
              var _element = renderEdit(text, record, index, function (element) {
                return _this2.cloneEditElement(element, column, columnIndex);
              });

              if (_element === false) return defaultRender();else if (_element !== true) return _element;
            }

            var element = /*#__PURE__*/_react.default.createElement(_antd.Input, {
              value: text,
              onChange: function onChange(e) {
                dataSource[index][column.dataIndex] = e.target.value;

                _this2.setState({
                  dataSource: dataSource
                });

                defaultValueChange && defaultValueChange({
                  value: e.target.value,
                  record: record,
                  index: index,
                  column: column,
                  columnIndex: columnIndex
                });
              }
            });

            return _this2.cloneEditElement(element, column, columnIndex);
          }
        });
      });
    }
  }, {
    key: "rowSelection",
    value: function rowSelection() {
      var _this3 = this;

      var _ref2 = this.props.rowSelection || {},
          _onChange = _ref2.onChange,
          others = (0, _objectWithoutProperties2.default)(_ref2, _excluded4);

      return _objectSpread(_objectSpread({
        type: 'radio',
        columnWidth: 32,
        selectedRowKeys: this.state.selectedRowKeys
      }, others), {}, {
        onChange: function onChange(selectedRowKeys, selectedRows) {
          _this3.selectRows(selectedRowKeys, selectedRows);

          _onChange && _onChange(selectedRowKeys, selectedRows);
        }
      });
    }
  }, {
    key: "onRow",
    value: function onRow(record, index) {
      var _this4 = this;

      var _this$props3 = this.props,
          rowKey = _this$props3.rowKey,
          editQuery = _this$props3.editQuery;

      var _ref3 = this.props.onRow ? this.props.onRow(record, index) : {},
          className = _ref3.className,
          _onDoubleClick = _ref3.onDoubleClick,
          _onKeyDown = _ref3.onKeyDown,
          others = (0, _objectWithoutProperties2.default)(_ref3, _excluded5);

      return _objectSpread(_objectSpread({}, others), {}, {
        className: "".concat(record[rowKey] === this.state.editingRowKey ? 'ws-edit-row' : '', " ").concat(className || ''),
        onDoubleClick: function onDoubleClick(e) {
          if (!editQuery || editQuery(record, index)) _this4.editRow(record[rowKey]);
          _onDoubleClick && _onDoubleClick(e);
        },
        onKeyDown: function onKeyDown(e) {
          if (e.key === 'Escape' && _this4.exitEditing.pressEscape || e.key === 'Enter' && _this4.exitEditing.pressEnter) {
            e.stopPropagation();

            _this4.setState({
              editingRowKey: null
            });
          }

          _onKeyDown && _onKeyDown(e);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props4 = this.props,
          className = _this$props4.className,
          columns = _this$props4.columns,
          dataSource = _this$props4.dataSource,
          rowSelection = _this$props4.rowSelection,
          onRow = _this$props4.onRow,
          others = (0, _objectWithoutProperties2.default)(_this$props4, _excluded6);
      return /*#__PURE__*/_react.default.createElement(_HoldTable.default, (0, _extends2.default)({}, others, {
        className: "ws-edit-table ".concat(className || ''),
        columns: this.convertColumns(columns),
        dataSource: this.state.dataSource,
        rowSelection: this.rowSelection(),
        onRow: function onRow(record, index) {
          return _this5.onRow(record, index);
        }
      }));
    }
  }]);
  return EditTable;
}(_react.default.Component);

exports.default = EditTable;
EditTable.propTypes = _objectSpread(_objectSpread({}, _HoldTable.default.propTypes), {}, {
  defaultEditAble: _propTypes.default.bool,
  defaultValueChange: _propTypes.default.func,
  // (e: {value, record, index, column, columnIndex})
  editQuery: _propTypes.default.func,
  // (record, index)
  exitEditing: _propTypes.default.shape({
    // 退出编辑状态事件，可单独设置
    pressEscape: _propTypes.default.bool,
    // 默认为 true
    pressEnter: _propTypes.default.bool,
    // 默认为 false
    clickOutside: _propTypes.default.bool,
    // 默认为 true
    changeRow: _propTypes.default.bool // 默认为 true

  }),
  onStateChange: _propTypes.default.func // (selectedRowKeys, editingRowKey)

});
EditTable.defaultProps = _objectSpread(_objectSpread({}, _HoldTable.default.defaultProps), {}, {
  tableLayout: 'fixed',
  size: 'small',
  bordered: true,
  pagination: false,
  defaultEditAble: true
});