"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _react = _interopRequireDefault(require("react"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Navigator = /*#__PURE__*/function () {
  //routes: 路由定义数组，必填
  //defaultOpenUris: 默认打开键数组
  //options:
  //  navType: 导航类型， global 或 local ，默认为 global
  function Navigator(routes, defaultOpenUris, options) {
    (0, _classCallCheck2.default)(this, Navigator);
    this.routes = routes;
    this.defaultOpenUris = defaultOpenUris || [];
    this.options = _objectSpread({
      navType: 'global'
    }, options);
    this.eventHandlerSet = {};
    this.state = {
      activePath: (this.defaultOpenUris[0] || '').split('?')[0],
      pageSet: this.initPageSet()
    };
    this.installListener();
  } // 管理函数


  (0, _createClass2.default)(Navigator, [{
    key: "register",
    value: function register(event, handler) {
      var _this = this;

      if (!this.eventHandlerSet[event]) this.eventHandlerSet[event] = [];
      this.eventHandlerSet[event].push(handler);
      return {
        unregister: function unregister() {
          return _this.unregister(event, handler);
        }
      };
    }
  }, {
    key: "unregister",
    value: function unregister(event, handler) {
      this.eventHandlerSet[event] = this.eventHandlerSet[event] && this.eventHandlerSet[event].filter(function (item) {
        return item !== handler;
      });
    }
  }, {
    key: "emit",
    value: function emit(event, data) {
      this.eventHandlerSet[event] && this.eventHandlerSet[event].map(function (handler) {
        return handler(data);
      });
    }
  }, {
    key: "getPath",
    value: function getPath(ref) {
      var pageSet = this.state.pageSet;

      for (var key in pageSet) {
        if (pageSet[key].ref === ref) return key;
      }

      return null;
    }
  }, {
    key: "changeParams",
    value: function changeParams(path, params) {
      var page = this.state.pageSet[path];
      if (!page) return;
      Object.assign(page.params, params);
      this.setState({});
    } // *** 导航函数

  }, {
    key: "switchTo",
    value: function switchTo(path) {
      var page = this.state.pageSet[path];
      this.setState({
        activePath: page ? path : null
      });
    }
  }, {
    key: "routeTo",
    value: function routeTo(uri) {
      return this.open(uri);
    }
  }, {
    key: "redirectTo",
    value: function redirectTo(uri) {
      var oldUri = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      var _split = (uri || '').split('?'),
          _split2 = (0, _slicedToArray2.default)(_split, 2),
          path = _split2[0],
          queryString = _split2[1];

      var oldPath = oldUri && oldUri.split('?')[0];
      var _this$state = this.state,
          activePath = _this$state.activePath,
          pageSet = _this$state.pageSet;
      var newPageSet = {};
      if (oldPath === undefined) oldPath = activePath;

      for (var key in pageSet) {
        if (key === oldPath) {
          var page = this.genPage(path, queryString);
          if (page === false) return null;

          if (!page) {
            console.error('页面路由不存在：' + path);
            return null;
          }

          this.emit('pageClose', pageSet[oldPath]);
          newPageSet[path] = page;
        } else if (key === path) {
          continue;
        } else {
          newPageSet[key] = pageSet[key];
        }
      }

      this.setState({
        activePath: path,
        pageSet: newPageSet
      });
      return newPageSet[path];
    }
  }, {
    key: "open",
    value: function open(uri) {
      var _split3 = (uri || '').split('?'),
          _split4 = (0, _slicedToArray2.default)(_split3, 2),
          path = _split4[0],
          queryString = _split4[1];

      var _this$state2 = this.state,
          activePath = _this$state2.activePath,
          pageSet = _this$state2.pageSet;
      var page = pageSet[path];

      if (page) {
        page.uri = uri;
        Object.assign(page.params, this.getQueryParams(queryString));
      } else {
        page = this.genPage(path, queryString);
        if (page === false) return null;

        if (!page) {
          console.error('页面路由不存在：' + path);
          return null;
        }

        if (activePath && pageSet[activePath]) {
          var array = Object.keys(pageSet).map(function (key) {
            return {
              key: key,
              value: pageSet[key]
            };
          });
          pageSet = {};

          var _iterator = _createForOfIteratorHelper(array),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var item = _step.value;
              pageSet[item.key] = item.value;
              if (item.key === activePath) pageSet[path] = page;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          pageSet[path] = page;
        }
      }

      this.setState({
        activePath: path,
        pageSet: pageSet
      });
      return page;
    }
  }, {
    key: "close",
    value: function () {
      var _close = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(uri) {
        var path, _this$state3, activePath, pageSet, keys, index;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                path = uri && uri.split('?')[0];
                _this$state3 = this.state, activePath = _this$state3.activePath, pageSet = _this$state3.pageSet;

                if (pageSet[path]) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                _context.next = 6;
                return this.canClose(pageSet[path]);

              case 6:
                if (_context.sent) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return");

              case 8:
                if (path === activePath) {
                  keys = Object.keys(pageSet);
                  index = keys.indexOf(activePath);
                  if (index - 1 >= 0) activePath = keys[index - 1];else if (index + 1 < keys.length) activePath = keys[index + 1];else activePath = null;
                }

                this.emit('pageClose', pageSet[path]);
                delete pageSet[path];
                this.setState({
                  activePath: activePath,
                  pageSet: pageSet
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function close(_x) {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: "closeCurrent",
    value: function closeCurrent() {
      this.close(this.state.activePath);
    }
  }, {
    key: "closeAll",
    value: function () {
      var _closeAll = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _i, _Object$keys, key;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _i = 0, _Object$keys = Object.keys(this.state.pageSet);

              case 1:
                if (!(_i < _Object$keys.length)) {
                  _context2.next = 8;
                  break;
                }

                key = _Object$keys[_i];
                _context2.next = 5;
                return this.close(key);

              case 5:
                _i++;
                _context2.next = 1;
                break;

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function closeAll() {
        return _closeAll.apply(this, arguments);
      }

      return closeAll;
    }()
  }, {
    key: "closeOthers",
    value: function () {
      var _closeOthers = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(uri) {
        var path, _i2, _Object$keys2, key;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                path = uri && uri.split('?')[0];
                _i2 = 0, _Object$keys2 = Object.keys(this.state.pageSet);

              case 2:
                if (!(_i2 < _Object$keys2.length)) {
                  _context3.next = 10;
                  break;
                }

                key = _Object$keys2[_i2];

                if (!(key !== path)) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 7;
                return this.close(key);

              case 7:
                _i2++;
                _context3.next = 2;
                break;

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function closeOthers(_x2) {
        return _closeOthers.apply(this, arguments);
      }

      return closeOthers;
    }()
  }, {
    key: "closeLeft",
    value: function () {
      var _closeLeft = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(uri) {
        var path, _i3, _Object$keys3, key;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                path = uri && uri.split('?')[0];
                _i3 = 0, _Object$keys3 = Object.keys(this.state.pageSet);

              case 2:
                if (!(_i3 < _Object$keys3.length)) {
                  _context4.next = 11;
                  break;
                }

                key = _Object$keys3[_i3];

                if (!(key === path)) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("break", 11);

              case 6:
                _context4.next = 8;
                return this.close(key);

              case 8:
                _i3++;
                _context4.next = 2;
                break;

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function closeLeft(_x3) {
        return _closeLeft.apply(this, arguments);
      }

      return closeLeft;
    }()
  }, {
    key: "closeRight",
    value: function () {
      var _closeRight = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(uri) {
        var path, startFlag, _i4, _Object$keys4, key;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                path = uri && uri.split('?')[0];
                startFlag = false;
                _i4 = 0, _Object$keys4 = Object.keys(this.state.pageSet);

              case 3:
                if (!(_i4 < _Object$keys4.length)) {
                  _context5.next = 12;
                  break;
                }

                key = _Object$keys4[_i4];

                if (!startFlag) {
                  _context5.next = 8;
                  break;
                }

                _context5.next = 8;
                return this.close(key);

              case 8:
                if (key === path) startFlag = true;

              case 9:
                _i4++;
                _context5.next = 3;
                break;

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function closeRight(_x4) {
        return _closeRight.apply(this, arguments);
      }

      return closeRight;
    }() // *** 私有函数

  }, {
    key: "installListener",
    value: function installListener() {
      var _this2 = this;

      if (this.options.navType !== 'global') return;

      this.hashChangeHandler = function (e) {
        var uri = window.location.hash ? window.location.hash.substr(1) : '/';
        var path = uri.split('?')[0];
        if (path !== _this2.state.activePath) _this2.open(uri);
      };

      window.addEventListener('hashchange', this.hashChangeHandler);
    }
  }, {
    key: "uninstallListener",
    value: function uninstallListener() {
      if (this.options.navType !== 'global') return;
      window.removeEventListener('hashchange', this.hashChangeHandler);
    }
  }, {
    key: "setState",
    value: function setState(newState) {
      var activePath = this.state.activePath;

      if ('activePath' in newState && activePath !== newState.activePath && this.state.pageSet[activePath]) {
        this.emit('pageHide', this.state.pageSet[activePath]);
      }

      Object.assign(this.state, newState);
      this.emit('navigatorStateChange', this.state);

      if (activePath !== this.state.activePath) {
        var page = this.state.pageSet[this.state.activePath];

        if (page) {
          this.emit('pageShow', page);
          if (this.options.navType === 'global') window.location.hash = page.uri;
        }
      }
    }
  }, {
    key: "initPageSet",
    value: function initPageSet() {
      var pageSet = {};

      var _iterator2 = _createForOfIteratorHelper(this.defaultOpenUris),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var uri = _step2.value;

          var _uri$split = uri.split('?'),
              _uri$split2 = (0, _slicedToArray2.default)(_uri$split, 2),
              path = _uri$split2[0],
              queryString = _uri$split2[1];

          var page = this.genPage(path, queryString);
          if (page) pageSet[path] = page;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return pageSet;
    }
  }, {
    key: "genPage",
    value: function genPage(path, queryString) {
      var _ref = this.matchRoute(path) || {},
          route = _ref.route,
          pathParams = _ref.pathParams;

      if (!route) return null;
      var Page = route.Page,
          params = route.params,
          options = route.options,
          onRoute = route.onRoute;
      var queryParams = this.getQueryParams(queryString);

      if (onRoute) {
        onRoute(_objectSpread(_objectSpread(_objectSpread({}, params), pathParams), queryParams));
        return false;
      }

      var navigator = this;
      var page = {
        uri: path + (queryString ? '?' + queryString : ''),
        Page: Page,
        params: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, Page.defaultProps), params), pathParams), queryParams),
        options: _objectSpread({}, options),
        render: function render() {
          var _this3 = this;

          return /*#__PURE__*/_react.default.createElement(this.Page, (0, _extends2.default)({}, this.params, {
            key: this.uri,
            ref: function ref(v) {
              return v && _this3.ref !== v && (_this3.ref = v) && navigator.emit('pageMount', _this3);
            }
          }));
        }
      };
      this.emit('pageCreate', page);
      return page;
    }
  }, {
    key: "matchRoute",
    value: function matchRoute(path) {
      var pathParams = {};
      var pathItems = path.split('/');

      var match = function match(route) {
        var routeItems = route.path.split('/');
        if (routeItems.length !== pathItems.length) return false;
        pathParams = {};

        for (var i = 0; i < pathItems.length; i++) {
          var pathItem = pathItems[i],
              routeItem = routeItems[i];

          if (routeItem && routeItem[0] === '{' && routeItem[routeItem.length - 1] === '}') {
            pathParams[routeItem.substr(1, routeItem.length - 2)] = pathItem;
          } else if (pathItem !== routeItem) {
            return false;
          }
        }

        return true;
      };

      var _iterator3 = _createForOfIteratorHelper(this.routes),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var route = _step3.value;
          if (match(route)) return {
            route: route,
            pathParams: pathParams
          };
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return null;
    }
  }, {
    key: "canClose",
    value: function () {
      var _canClose = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(page) {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!page.options.noClose) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", false);

              case 2:
                if (!(page.ref && page.ref.closeQuery)) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 5;
                return page.ref.closeQuery();

              case 5:
                return _context6.abrupt("return", _context6.sent);

              case 6:
                return _context6.abrupt("return", true);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function canClose(_x5) {
        return _canClose.apply(this, arguments);
      }

      return canClose;
    }()
  }, {
    key: "getQueryParams",
    value: function getQueryParams(queryString) {
      var result = {};

      var _iterator4 = _createForOfIteratorHelper((queryString || '').split('&')),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var item = _step4.value;
          var kv = item.split('=');
          result[kv[0]] = kv[1] && decodeURIComponent(kv[1]);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return result;
    }
  }]);
  return Navigator;
}();

exports.default = Navigator;