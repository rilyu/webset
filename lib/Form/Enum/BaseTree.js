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
var _excluded = ["readOnly", "loading", "searchValue", "filterTreeNode", "onSearch"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var BaseTree = /*#__PURE__*/function (_Field) {
  (0, _inherits2.default)(BaseTree, _Field);
  var _super = _createSuper(BaseTree);
  function BaseTree(props) {
    var _this;
    (0, _classCallCheck2.default)(this, BaseTree);
    _this = _super.call(this, props);
    _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
      loading: false,
      data: null,
      treeData: null,
      searchValue: ''
    });
    return _this;
  }
  (0, _createClass2.default)(BaseTree, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              (0, _get2.default)((0, _getPrototypeOf2.default)(BaseTree.prototype), "componentDidMount", this) && (0, _get2.default)((0, _getPrototypeOf2.default)(BaseTree.prototype), "componentDidMount", this).call(this);
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
              if (this.props.onDataHandle) data = this.props.onDataHandle(data);
              this.setState({
                loading: false,
                data: data,
                treeData: this.makeTreeData(data)
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
    key: "getRootId",
    value: function getRootId() {
      return this.props.rootId;
    }
  }, {
    key: "getParentId",
    value: function getParentId(item) {
      return item && item.parentId;
    }
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
    key: "getTitle",
    value: function getTitle(item) {
      return item ? "[".concat(this.getId(item), "]").concat(this.getName(item)) : '';
    }
  }, {
    key: "getSelectable",
    value: function getSelectable(item) {
      return item && item.selectable !== false;
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
    key: "makeTreeData",
    value: function makeTreeData(data) {
      var _this3 = this;
      var findNodes = function findNodes(parentId) {
        return data.filter(function (item) {
          return _this3.getParentId(item) === parentId;
        }).map(function (item) {
          return {
            item: item,
            subList: findNodes(_this3.getId(item))
          };
        });
      };
      if (!data) data = [];
      var rootId = this.getRootId() || 0;
      var rootList = data.filter(function (item) {
        return _this3.getId(item) === rootId;
      });
      if (rootList.length === 0) rootList = data.filter(function (item) {
        return _this3.getParentId(item) === rootId;
      });
      return rootList.map(function (item) {
        return {
          item: item,
          subList: findNodes(_this3.getId(item))
        };
      });
    }
  }, {
    key: "renderNode",
    value: function renderNode(node) {
      var _this4 = this;
      var searchValue = this.state.searchValue;
      var item = node.item,
        subList = node.subList;
      var title = this.getTitle(item);
      var searchPos = searchValue && title ? title.indexOf(searchValue) : -1;
      if (searchPos >= 0) {
        var head = title.substr(0, searchPos);
        var tail = title.substr(searchPos + searchValue.length);
        title = /*#__PURE__*/_react.default.createElement("span", null, head, /*#__PURE__*/_react.default.createElement("span", {
          style: {
            color: '#f50'
          }
        }, searchValue), tail);
      }
      return /*#__PURE__*/_react.default.createElement(_antd.TreeSelect.TreeNode, {
        value: this.getId(item),
        title: title,
        selectable: this.getSelectable(item),
        data: item,
        key: this.getId(item)
      }, subList.map(function (subNode) {
        return _this4.renderNode(subNode);
      }));
    }
  }, {
    key: "renderDetail",
    value: function renderDetail() {
      var _this5 = this;
      var _this$otherProps = this.otherProps,
        readOnly = _this$otherProps.readOnly,
        loading = _this$otherProps.loading,
        searchValue = _this$otherProps.searchValue,
        filterTreeNode = _this$otherProps.filterTreeNode,
        _onSearch = _this$otherProps.onSearch,
        others = (0, _objectWithoutProperties2.default)(_this$otherProps, _excluded);
      if (loading === undefined) loading = this.state.loading;
      if (searchValue === undefined) searchValue = this.state.searchValue;
      if (filterTreeNode === undefined) filterTreeNode = function filterTreeNode(value, node) {
        return _this5.getTitle(node.props.data).toLowerCase().indexOf(value.toLowerCase()) >= 0;
      };
      if (readOnly === undefined) readOnly = this.mergeProps.mode === 'view';
      var readOnlyProps = readOnly ? {
        open: false,
        allowClear: false
      } : {};
      return /*#__PURE__*/_react.default.createElement(_antd.TreeSelect, (0, _extends2.default)({
        dropdownStyle: {
          maxHeight: 320,
          overflow: 'auto'
        },
        loading: loading,
        searchValue: searchValue,
        filterTreeNode: filterTreeNode,
        onSearch: function onSearch(searchValue) {
          _this5.setState({
            searchValue: searchValue
          });
          _onSearch && _onSearch(searchValue);
        }
      }, others, readOnlyProps), this.state.treeData ? this.state.treeData.map(function (item) {
        return _this5.renderNode(item);
      }) : []);
    }

    // 支持多个 id 值
  }, {
    key: "renderValueString",
    value: function renderValueString(value) {
      var _this6 = this;
      if (!(value instanceof Array)) value = [value];
      return value.map(function (v) {
        var item = _this6.getItem(v);
        return item ? _this6.getTitle(item) : v || v === 0 ? "".concat(v) : '';
      }).join(',');
    }
  }]);
  return BaseTree;
}(_Field2.default);
exports.default = BaseTree;
BaseTree.propTypes = _objectSpread(_objectSpread({}, _Field2.default.propTypes), {}, {
  readOnly: _propTypes.default.bool,
  rootId: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  onDataHandle: _propTypes.default.func //(data) => data , 过滤数据或增加数据项
});
BaseTree.defaultProps = _objectSpread(_objectSpread({}, _Field2.default.defaultProps), {}, {
  allowClear: true,
  treeDefaultExpandAll: true,
  showSearch: true
});