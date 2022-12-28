"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _smoothscrollPolyfill = _interopRequireDefault(require("smoothscroll-polyfill"));
var _AnimationFrame = _interopRequireDefault(require("./AnimationFrame"));
var _ScrollBarThumb = _interopRequireDefault(require("./ScrollBarThumb"));
require("./ScrollBar.css");
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
_smoothscrollPolyfill.default.polyfill();
var ScrollBar = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ScrollBar, _React$Component);
  var _super = _createSuper(ScrollBar);
  function ScrollBar(props) {
    var _this;
    (0, _classCallCheck2.default)(this, ScrollBar);
    _this = _super.call(this, props);
    _this.state = {
      container: null,
      thumbDraging: false
    };
    _this.parentNodeScrollHandler = function (e) {
      return _this.forceUpdate();
    };
    return _this;
  }
  (0, _createClass2.default)(ScrollBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.timer = setInterval(function () {
        return _this2.checkLayout();
      }, 100);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.timer);
      this.removeEventListener();
    }
  }, {
    key: "commonClassName",
    get: function get() {
      return "ws-scrollbar ".concat(this.props.visible === 'hover' ? 'ws-scrollbar-hover' : '', " ").concat(this.state.thumbDraging ? 'ws-scrollbar-draging-' + this.state.thumbDraging : '');
    }
  }, {
    key: "stickyStyle",
    get: function get() {
      var _ref = this.state.container ? window.getComputedStyle(this.state.container.parentNode) : {},
        _ref$paddingRight = _ref.paddingRight,
        paddingRight = _ref$paddingRight === void 0 ? 0 : _ref$paddingRight,
        _ref$paddingBottom = _ref.paddingBottom,
        paddingBottom = _ref$paddingBottom === void 0 ? 0 : _ref$paddingBottom;
      return {
        position: 'sticky',
        left: '100%',
        top: '100%',
        transform: "translate(".concat(paddingRight, ", ").concat(paddingBottom, ")")
      };
    }
  }, {
    key: "fixedStyle",
    get: function get() {
      var _ref2 = this.state.container ? this.state.container.parentNode.getBoundingClientRect() : {},
        _ref2$left = _ref2.left,
        left = _ref2$left === void 0 ? 0 : _ref2$left,
        _ref2$top = _ref2.top,
        top = _ref2$top === void 0 ? 0 : _ref2$top;
      var _ref3 = this.state.container ? this.state.container.parentNode : {},
        _ref3$clientLeft = _ref3.clientLeft,
        clientLeft = _ref3$clientLeft === void 0 ? 0 : _ref3$clientLeft,
        _ref3$clientTop = _ref3.clientTop,
        clientTop = _ref3$clientTop === void 0 ? 0 : _ref3$clientTop,
        _ref3$clientWidth = _ref3.clientWidth,
        clientWidth = _ref3$clientWidth === void 0 ? 0 : _ref3$clientWidth,
        _ref3$clientHeight = _ref3.clientHeight,
        clientHeight = _ref3$clientHeight === void 0 ? 0 : _ref3$clientHeight;
      return {
        position: 'fixed',
        left: left + clientLeft + clientWidth,
        top: top + clientTop + clientHeight
      };
    }
  }, {
    key: "addEventListener",
    value: function addEventListener() {
      this.state.container && this.state.container.parentNode.addEventListener('scroll', this.parentNodeScrollHandler);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {
      this.state.container && this.state.container.parentNode.removeEventListener('scroll', this.parentNodeScrollHandler);
    }
  }, {
    key: "changeContainer",
    value: function changeContainer(container) {
      var _this3 = this;
      if (!container || this.state.container === container) return;
      this.removeEventListener();
      this.setState({
        container: container
      }, function () {
        return _this3.addEventListener();
      });
    }
  }, {
    key: "checkLayout",
    value: function checkLayout() {
      if (!this.state.container) return;
      var _this$state$container = this.state.container.parentNode,
        clientWidth = _this$state$container.clientWidth,
        clientHeight = _this$state$container.clientHeight,
        scrollWidth = _this$state$container.scrollWidth,
        scrollHeight = _this$state$container.scrollHeight;
      var _this$state$container2 = this.state.container.parentNode.getBoundingClientRect(),
        left = _this$state$container2.left,
        top = _this$state$container2.top;
      if (!this.prevLayout || clientWidth !== this.prevLayout.clientWidth || clientHeight !== this.prevLayout.clientHeight || scrollWidth !== this.prevLayout.scrollWidth || scrollHeight !== this.prevLayout.scrollHeight || left !== this.prevLayout.left || top !== this.prevLayout.top) {
        this.prevLayout = {
          clientWidth: clientWidth,
          clientHeight: clientHeight,
          scrollWidth: scrollWidth,
          scrollHeight: scrollHeight,
          left: left,
          top: top
        };
        this.forceUpdate();
      }
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(left, top, smooth) {
      var container = this.state.container;
      if (!container) return;
      if (container.parentNode.scrollTo && smooth) {
        container.parentNode.scrollTo({
          left: left,
          top: top,
          behavior: 'smooth'
        });
      } else {
        container.parentNode.scrollLeft = left;
        container.parentNode.scrollTop = top;
      }
    }
  }, {
    key: "renderHorizontal",
    value: function renderHorizontal(showCorner) {
      var _this4 = this;
      var _this$state$container3 = this.state.container.parentNode,
        clientWidth = _this$state$container3.clientWidth,
        scrollWidth = _this$state$container3.scrollWidth,
        scrollLeft = _this$state$container3.scrollLeft,
        scrollTop = _this$state$container3.scrollTop;
      var trackLength = clientWidth || 1;
      var scrollTo = function scrollTo(position, smooth) {
        position = Math.min(Math.max(position, 0), scrollWidth - clientWidth);
        _this4.scrollTo(position, scrollTop, smooth);
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(this.commonClassName, " ").concat(showCorner ? 'ws-scrollbar-has-corner' : '', " ws-scrollbar-horizontal"),
        style: {
          left: -clientWidth
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-scrollbar-track",
        ref: function ref(v) {
          return v && (trackLength = v.getBoundingClientRect().width || 1);
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-scrollbar-track-piece",
        style: {
          width: scrollLeft / scrollWidth * 100 + '%'
        },
        onClick: function onClick() {
          return scrollTo(scrollLeft - clientWidth, true);
        }
      }), /*#__PURE__*/_react.default.createElement(_ScrollBarThumb.default, {
        className: "ws-scrollbar-thumb",
        style: {
          width: clientWidth / scrollWidth * 100 + '%'
        },
        position: scrollLeft,
        onHold: function onHold() {
          return _this4.setState({
            thumbDraging: 'horizontal'
          });
        },
        onRelease: function onRelease() {
          return _this4.setState({
            thumbDraging: false
          });
        },
        onDraging: function onDraging(position, dx, dy) {
          return scrollTo(position + dx * scrollWidth / trackLength, false);
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-scrollbar-track-piece",
        style: {
          width: (scrollWidth - clientWidth - scrollLeft) / scrollWidth * 100 + '%'
        },
        onClick: function onClick() {
          return scrollTo(scrollLeft + clientWidth, true);
        }
      })));
    }
  }, {
    key: "renderVertical",
    value: function renderVertical(showCorner) {
      var _this5 = this;
      var _this$state$container4 = this.state.container.parentNode,
        clientHeight = _this$state$container4.clientHeight,
        scrollHeight = _this$state$container4.scrollHeight,
        scrollTop = _this$state$container4.scrollTop,
        scrollLeft = _this$state$container4.scrollLeft;
      var trackLength = clientHeight || 1;
      var scrollTo = function scrollTo(position, smooth) {
        position = Math.min(Math.max(position, 0), scrollHeight - clientHeight);
        _this5.scrollTo(scrollLeft, position, smooth);
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(this.commonClassName, " ").concat(showCorner ? 'ws-scrollbar-has-corner' : '', " ws-scrollbar-vertical"),
        style: {
          top: -clientHeight
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-scrollbar-track",
        ref: function ref(v) {
          return v && (trackLength = v.getBoundingClientRect().height || 1);
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-scrollbar-track-piece",
        style: {
          height: scrollTop / scrollHeight * 100 + '%'
        },
        onClick: function onClick() {
          return scrollTo(scrollTop - clientHeight, true);
        }
      }), /*#__PURE__*/_react.default.createElement(_ScrollBarThumb.default, {
        className: "ws-scrollbar-thumb",
        style: {
          height: clientHeight / scrollHeight * 100 + '%'
        },
        position: scrollTop,
        onHold: function onHold() {
          return _this5.setState({
            thumbDraging: 'vertical'
          });
        },
        onRelease: function onRelease() {
          return _this5.setState({
            thumbDraging: false
          });
        },
        onDraging: function onDraging(position, dx, dy) {
          return scrollTo(position + dy * scrollHeight / trackLength, false);
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-scrollbar-track-piece",
        style: {
          height: (scrollHeight - clientHeight - scrollTop) / scrollHeight * 100 + '%'
        },
        onClick: function onClick() {
          return scrollTo(scrollTop + clientHeight, true);
        }
      })));
    }
  }, {
    key: "renderCorner",
    value: function renderCorner() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(this.commonClassName, " ws-scrollbar-corner")
      });
    }
  }, {
    key: "renderScrollBar",
    value: function renderScrollBar() {
      var visible = this.props.visible;
      if (!this.state.container) return false;
      var _this$state$container5 = this.state.container.parentNode,
        clientWidth = _this$state$container5.clientWidth,
        clientHeight = _this$state$container5.clientHeight,
        scrollWidth = _this$state$container5.scrollWidth,
        scrollHeight = _this$state$container5.scrollHeight;
      var _window$getComputedSt = window.getComputedStyle(this.state.container.parentNode),
        overflowX = _window$getComputedSt.overflowX,
        overflowY = _window$getComputedSt.overflowY;
      var showHorizontal = visible === 'visible' || overflowX === 'scroll' || overflowX === 'auto' && scrollWidth > clientWidth;
      var showVertical = visible === 'visible' || overflowY === 'scroll' || overflowY === 'auto' && scrollHeight > clientHeight;
      var showCorner = showHorizontal && showVertical;
      if (!showHorizontal && !showVertical) return false;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, showHorizontal && this.renderHorizontal(showCorner), showVertical && this.renderVertical(showCorner), showCorner && this.renderCorner());
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;
      var _this$props = this.props,
        visible = _this$props.visible,
        position = _this$props.position;
      if (visible === 'hidden') return false;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "ws-scrollbar-container",
        style: position === 'fixed' ? this.fixedStyle : this.stickyStyle,
        ref: function ref(v) {
          return _this6.changeContainer(v);
        }
      }, this.renderScrollBar(), position === 'fixed' && /*#__PURE__*/_react.default.createElement(_AnimationFrame.default, {
        onEvent: function onEvent() {
          return _this6.checkLayout();
        }
      }));
    }
  }]);
  return ScrollBar;
}(_react.default.Component);
exports.default = ScrollBar;
ScrollBar.propTypes = {
  visible: _propTypes.default.oneOf(['hover', 'auto', 'visible', 'hidden']),
  position: _propTypes.default.oneOf(['sticky', 'fixed'])
};
ScrollBar.defaultProps = {
  visible: 'hover',
  position: 'sticky'
};