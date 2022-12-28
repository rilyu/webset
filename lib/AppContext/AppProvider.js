"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _AppContext = _interopRequireDefault(require("./AppContext"));
var _excluded = ["children", "value"];
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var keyValue = 0;
var AppProvider = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(AppProvider, _React$Component);
  var _super = _createSuper(AppProvider);
  function AppProvider(props) {
    var _this;
    (0, _classCallCheck2.default)(this, AppProvider);
    _this = _super.call(this, props);
    _this.state = {
      elements: []
    };
    return _this;
  }
  (0, _createClass2.default)(AppProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.addOverlayHandler = function (e) {
        return _this2.add(e.detail);
      };
      this.removeOverlayHandler = function (e) {
        return _this2.remove(e.detail);
      };
      this.removeAllOverlayHandler = function (e) {
        return _this2.removeAll(e.detail);
      };
      this.updateOverlayHandler = function (e) {
        return _this2.update(e.detail);
      };
      window.addEventListener("addOverlay", this.addOverlayHandler);
      window.addEventListener("removeOverlay", this.removeOverlayHandler);
      window.addEventListener("removeAllOverlay", this.removeAllOverlayHandler);
      window.addEventListener("updateOverlay", this.updateOverlayHandler);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("addOverlay", this.addOverlayHandler);
      window.removeEventListener("removeOverlay", this.removeOverlayHandler);
      window.removeEventListener("removeAllOverlay", this.removeAllOverlayHandler);
      window.removeEventListener("updateOverlay", this.updateOverlayHandler);
    }
  }, {
    key: "add",
    value: function add(e) {
      var elements = this.state.elements;
      elements.push(e);
      this.setState({
        elements: elements
      });
    }
  }, {
    key: "remove",
    value: function remove(e) {
      var elements = this.state.elements;
      for (var i = elements.length - 1; i >= 0; --i) {
        if (elements[i].key === e.key) {
          elements.splice(i, 1);
          break;
        }
      }
      this.setState({
        elements: elements
      });
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      this.setState({
        elements: []
      });
    }
  }, {
    key: "update",
    value: function update(e) {
      var elements = this.state.elements;
      for (var i = elements.length - 1; i >= 0; --i) {
        if (elements[i].key === e.key) {
          elements[i] = e;
          break;
        }
      }
      this.setState({
        elements: elements
      });
    }
  }, {
    key: "renderTopViews",
    value: function renderTopViews() {
      var elements = this.state.elements;
      var topViews = elements.map(function (item, index) {
        return /*#__PURE__*/_react.default.cloneElement(item.element, {
          key: 'topView' + item.key
        });
      });
      return topViews;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        children = _this$props.children,
        value = _this$props.value,
        others = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      this.constructor.context = value;
      return /*#__PURE__*/_react.default.createElement(_AppContext.default.Provider, (0, _extends2.default)({
        value: value
      }, others), children, this.renderTopViews());
    }
  }], [{
    key: "createEvent",
    value:
    // 在渲染时设置值，使得可以在静态类中使用

    function createEvent(name, detail) {
      var e;
      if ('CustomEvent' in window && typeof window.CustomEvent === 'function') {
        e = new CustomEvent(name, {
          detail: detail
        });
      } else {
        e = document.createEvent('CustomEvent');
        e.initCustomEvent(name, false, false, detail);
      }
      return e;
    }
  }, {
    key: "sendEvent",
    value: function sendEvent(name, detail) {
      var e = this.createEvent(name, detail);
      window.dispatchEvent(e);
    }
  }, {
    key: "add",
    value: function add(element) {
      var key = ++keyValue;
      this.sendEvent('addOverlay', {
        key: key,
        element: element
      });
      return key;
    }
  }, {
    key: "remove",
    value: function remove(key) {
      this.sendEvent('removeOverlay', {
        key: key
      });
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      this.sendEvent('removeAllOverlay', {});
    }
  }, {
    key: "update",
    value: function update(key, element) {
      this.sendEvent('updateOverlay', {
        key: key,
        element: element
      });
    }
  }]);
  return AppProvider;
}(_react.default.Component);
exports.default = AppProvider;
AppProvider.context = null;
AppProvider.propTypes = {
  value: _propTypes.default.object.isRequired
};