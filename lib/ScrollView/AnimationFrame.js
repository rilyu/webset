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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var AnimationFrame = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(AnimationFrame, _React$Component);

  var _super = _createSuper(AnimationFrame);

  function AnimationFrame() {
    (0, _classCallCheck2.default)(this, AnimationFrame);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(AnimationFrame, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.active && this.start();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stop();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.active !== prevProps.active) {
        this.props.active ? this.start() : this.stop();
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      var handleEvent = function handleEvent(timestamp) {
        if (!_this.props.active || !_this.animationFrameId) return;
        _this.props.onEvent && _this.props.onEvent(timestamp);
        _this.animationFrameId = window.requestAnimationFrame(function (timestamp) {
          return handleEvent(timestamp);
        });
      };

      this.animationFrameId = window.requestAnimationFrame(function (timestamp) {
        return handleEvent(timestamp);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      if (!this.animationFrameId) return;
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }, {
    key: "render",
    value: function render() {
      return false;
    }
  }]);
  return AnimationFrame;
}(_react.default.Component);

exports.default = AnimationFrame;
AnimationFrame.propTypes = {
  active: _propTypes.default.bool,
  onEvent: _propTypes.default.func // (timestamp)

};
AnimationFrame.defaultProps = {
  active: true
};

(function () {
  if (window.requestAnimationFrame) return;
  window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
  window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelAnimationFrame;

  if (!window.requestAnimationFrame) {
    var lastTime = 0;

    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        return callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    window.cancelAnimationFrame = function (id) {
      return clearTimeout(id);
    };
  }
})();