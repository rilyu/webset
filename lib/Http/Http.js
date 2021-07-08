"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Http.js
var Http = /*#__PURE__*/function () {
  function Http(props) {
    (0, _classCallCheck2.default)(this, Http);

    var _ref = props || {},
        baseUrl = _ref.baseUrl,
        debugMode = _ref.debugMode,
        debugDisableSet = _ref.debugDisableSet;

    this.baseUrl = baseUrl || '';
    this.debugMode = !!debugMode;
    this.debugDisableSet = _objectSpread({}, debugDisableSet);
    this.cacheDataSet = {};
    this.cacheLoadingSet = {};
  }

  (0, _createClass2.default)(Http, [{
    key: "resolveUrl",
    value: function resolveUrl(url) {
      var baseUrl = this.baseUrl;
      if (!url || /^(\w*:)?\/\//.test(url) || !baseUrl) return url;
      if (url.substr(0, 1) === '/' && baseUrl.substr(-1) === '/') return baseUrl + url.substr(1);
      return baseUrl + url;
    } // 使用 encoders decoders 的目的是解决日志打印顺序问题
    // Base

  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref2) {
        var url, params, options, encoders, decoders;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = _ref2.url, params = _ref2.params, options = _ref2.options;
                options = _objectSpread({
                  method: 'GET',
                  body: params
                }, options);
                encoders = [this.baseEncode.bind(this)];
                decoders = [this.baseDecode.bind(this)];
                return _context.abrupt("return", this.request({
                  url: url,
                  options: options,
                  encoders: encoders,
                  decoders: decoders
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_ref3) {
        var url, params, options, encoders, decoders;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = _ref3.url, params = _ref3.params, options = _ref3.options;
                options = _objectSpread({
                  method: 'POST',
                  body: params
                }, options);
                encoders = [this.baseEncode.bind(this)];
                decoders = [this.baseDecode.bind(this)];
                return _context2.abrupt("return", this.request({
                  url: url,
                  options: options,
                  encoders: encoders,
                  decoders: decoders
                }));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function post(_x3) {
        return _post.apply(this, arguments);
      }

      return post;
    }() // Text

  }, {
    key: "getText",
    value: function () {
      var _getText = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_ref4) {
        var url, params, options, encoders, decoders;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = _ref4.url, params = _ref4.params, options = _ref4.options;
                options = _objectSpread({
                  method: 'GET',
                  body: params
                }, options);
                encoders = [this.baseEncode.bind(this)]; // get 没有 body, 不需要其它 encoder

                decoders = [this.baseDecode.bind(this), this.textDecode.bind(this)];
                return _context3.abrupt("return", this.request({
                  url: url,
                  options: options,
                  encoders: encoders,
                  decoders: decoders
                }));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getText(_x4) {
        return _getText.apply(this, arguments);
      }

      return getText;
    }()
  }, {
    key: "postText",
    value: function () {
      var _postText = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_ref5) {
        var url, params, options, encoders, decoders;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                url = _ref5.url, params = _ref5.params, options = _ref5.options;
                options = _objectSpread({
                  method: 'POST',
                  body: params
                }, options);
                encoders = [this.baseEncode.bind(this), this.textEncode.bind(this)];
                decoders = [this.baseDecode.bind(this), this.textDecode.bind(this)];
                return _context4.abrupt("return", this.request({
                  url: url,
                  options: options,
                  encoders: encoders,
                  decoders: decoders
                }));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function postText(_x5) {
        return _postText.apply(this, arguments);
      }

      return postText;
    }() // Json

  }, {
    key: "getJson",
    value: function () {
      var _getJson = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_ref6) {
        var url, params, options, encoders, decoders;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                url = _ref6.url, params = _ref6.params, options = _ref6.options;
                options = _objectSpread({
                  method: 'GET',
                  body: params
                }, options);
                encoders = [this.baseEncode.bind(this)];
                decoders = [this.baseDecode.bind(this), this.textDecode.bind(this), this.jsonDecode.bind(this)];
                return _context5.abrupt("return", this.request({
                  url: url,
                  options: options,
                  encoders: encoders,
                  decoders: decoders
                }));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getJson(_x6) {
        return _getJson.apply(this, arguments);
      }

      return getJson;
    }()
  }, {
    key: "postJson",
    value: function () {
      var _postJson = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(_ref7) {
        var url, params, options, encoders, decoders;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                url = _ref7.url, params = _ref7.params, options = _ref7.options;
                options = _objectSpread({
                  method: 'POST',
                  body: params
                }, options);
                encoders = [this.baseEncode.bind(this), this.jsonEndode.bind(this), this.textEncode.bind(this)];
                decoders = [this.baseDecode.bind(this), this.textDecode.bind(this), this.jsonDecode.bind(this)];
                return _context6.abrupt("return", this.request({
                  url: url,
                  options: options,
                  encoders: encoders,
                  decoders: decoders
                }));

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function postJson(_x7) {
        return _postJson.apply(this, arguments);
      }

      return postJson;
    }() // FormData

  }, {
    key: "postFormData",
    value: function () {
      var _postFormData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(_ref8) {
        var url, params, options, encoders, decoders;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                url = _ref8.url, params = _ref8.params, options = _ref8.options;
                options = _objectSpread({
                  method: 'POST',
                  body: params
                }, options);
                encoders = [this.baseEncode.bind(this), this.formDataEncode.bind(this)];
                decoders = [this.baseDecode.bind(this), this.textDecode.bind(this), this.jsonDecode.bind(this)];
                return _context7.abrupt("return", this.request({
                  url: url,
                  options: options,
                  encoders: encoders,
                  decoders: decoders
                }));

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function postFormData(_x8) {
        return _postFormData.apply(this, arguments);
      }

      return postFormData;
    }()
  }, {
    key: "postUpload",
    value: function () {
      var _postUpload = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(_ref9) {
        var url, params, options, encoders, decoders;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                url = _ref9.url, params = _ref9.params, options = _ref9.options;
                options = _objectSpread({
                  method: 'POST',
                  body: params
                }, options);
                encoders = [this.baseEncode.bind(this), this.uploadEncode.bind(this)];
                decoders = [this.baseDecode.bind(this), this.textDecode.bind(this), this.jsonDecode.bind(this), this.uploadDecode.bind(this)];
                return _context8.abrupt("return", this.request({
                  url: url,
                  options: options,
                  encoders: encoders,
                  decoders: decoders
                }));

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function postUpload(_x9) {
        return _postUpload.apply(this, arguments);
      }

      return postUpload;
    }() // Cache

  }, {
    key: "callCache",
    value: function () {
      var _callCache = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(func, _ref10) {
        var url, params, options, others, sleep, cacheKey, cacheData, serial, result;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                url = _ref10.url, params = _ref10.params, options = _ref10.options, others = (0, _objectWithoutProperties2.default)(_ref10, ["url", "params", "options"]);

                sleep = /*#__PURE__*/function () {
                  var _ref11 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(milliseconds) {
                    return _regenerator.default.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            return _context9.abrupt("return", new Promise(function (resolve, reject) {
                              return setTimeout(function () {
                                return resolve();
                              }, milliseconds);
                            }));

                          case 1:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }));

                  return function sleep(_x12) {
                    return _ref11.apply(this, arguments);
                  };
                }();

                cacheKey = url + JSON.stringify(params);

              case 3:
                if (!this.cacheLoadingSet[cacheKey]) {
                  _context10.next = 8;
                  break;
                }

                _context10.next = 6;
                return sleep(1);

              case 6:
                _context10.next = 3;
                break;

              case 8:
                cacheData = this.cacheDataSet[cacheKey];

                if (!cacheData) {
                  _context10.next = 15;
                  break;
                }

                serial = this.constructor.serial;
                this.debug(serial, 'callCache', "POST: ".concat(url));
                this.debug(serial, 'callCache', params);
                this.debug(serial, 'callCache', 'cache hit ==>', cacheData);
                return _context10.abrupt("return", {
                  success: true,
                  data: cacheData
                });

              case 15:
                this.cacheLoadingSet[cacheKey] = true;
                _context10.next = 18;
                return func(_objectSpread({
                  url: url,
                  params: params,
                  options: options
                }, others));

              case 18:
                result = _context10.sent;
                this.cacheLoadingSet[cacheKey] = false;

                if (this.isSuccess(result)) {
                  this.cacheDataSet[cacheKey] = result.data;
                }

                return _context10.abrupt("return", result);

              case 22:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function callCache(_x10, _x11) {
        return _callCache.apply(this, arguments);
      }

      return callCache;
    }()
  }, {
    key: "clearCache",
    value: function clearCache(url, params) {
      var cacheKey = url + JSON.stringify(params);
      delete this.cacheDataSet[cacheKey];
    }
  }, {
    key: "clearAllCache",
    value: function clearAllCache() {
      this.cacheDataSet = {};
    }
  }, {
    key: "getJsonCache",
    value: function () {
      var _getJsonCache = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(args) {
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", this.callCache(this.getJson.bind(this), args));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function getJsonCache(_x13) {
        return _getJsonCache.apply(this, arguments);
      }

      return getJsonCache;
    }()
  }, {
    key: "postJsonCache",
    value: function () {
      var _postJsonCache = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12(args) {
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt("return", this.callCache(this.postJson.bind(this), args));

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function postJsonCache(_x14) {
        return _postJsonCache.apply(this, arguments);
      }

      return postJsonCache;
    }() // 判断是否成功

  }, {
    key: "isSuccess",
    value: function isSuccess(result) {
      return result && result.success;
    } // ================================================================
    // 内部方法
    // ================================================================
    // 某些情况下只取得匿名函数，比如使用了 async/await ，放弃使用

  }, {
    key: "getCallerName",
    value: function getCallerName() {
      var reg = /([^(]+)@|at ([^(]+) \(/g;
      var error = new Error();
      reg.exec(error.stack);
      reg.exec(error.stack);
      var regResult = reg.exec(error.stack);
      var callerName = regResult[1] || regResult[2];
      return callerName && callerName.split('.')[1];
    }
  }, {
    key: "debug",
    value: function debug(serial, callerName) {
      var _console;

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      if (this.debugMode && !this.debugDisableSet[callerName]) (_console = console).log.apply(_console, [serial, callerName].concat(args));
    }
  }, {
    key: "error",
    value: function error(serial, callerName) {
      var _console2;

      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      (_console2 = console).error.apply(_console2, [serial, callerName].concat(args));
    } // fetch
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch

  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(
    /*#__PURE__*/
    function () {
      var _ref12 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13(resource) {
        var init,
            _args13 = arguments;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                init = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : undefined;
                return _context13.abrupt("return", fetch(resource, init));

              case 2:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      return function (_x15) {
        return _ref12.apply(this, arguments);
      };
    }())
  }, {
    key: "request",
    value: function () {
      var _request = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14(_ref13) {
        var url, options, encoders, decoders, _iterator, _step, encoder, _yield$encoder, response, result, _iterator2, _step2, decoder;

        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                url = _ref13.url, options = _ref13.options, encoders = _ref13.encoders, decoders = _ref13.decoders;
                _context14.prev = 1;
                options = _objectSpread({
                  serial: this.constructor.serial,
                  method: 'GET'
                }, options);
                _iterator = _createForOfIteratorHelper(encoders || []);
                _context14.prev = 4;

                _iterator.s();

              case 6:
                if ((_step = _iterator.n()).done) {
                  _context14.next = 15;
                  break;
                }

                encoder = _step.value;
                _context14.next = 10;
                return encoder({
                  url: url,
                  options: options
                });

              case 10:
                _yield$encoder = _context14.sent;
                url = _yield$encoder.url;
                options = _yield$encoder.options;

              case 13:
                _context14.next = 6;
                break;

              case 15:
                _context14.next = 20;
                break;

              case 17:
                _context14.prev = 17;
                _context14.t0 = _context14["catch"](4);

                _iterator.e(_context14.t0);

              case 20:
                _context14.prev = 20;

                _iterator.f();

                return _context14.finish(20);

              case 23:
                _context14.next = 25;
                return fetch(url, options);

              case 25:
                response = _context14.sent;
                result = {
                  success: true,
                  response: response,
                  options: options
                };
                _iterator2 = _createForOfIteratorHelper(decoders || []);
                _context14.prev = 28;

                _iterator2.s();

              case 30:
                if ((_step2 = _iterator2.n()).done) {
                  _context14.next = 40;
                  break;
                }

                decoder = _step2.value;
                _context14.next = 34;
                return decoder(result);

              case 34:
                result = _context14.sent;

                if (result.success) {
                  _context14.next = 38;
                  break;
                }

                this.error(options.serial, 'request', result.error);
                return _context14.abrupt("break", 40);

              case 38:
                _context14.next = 30;
                break;

              case 40:
                _context14.next = 45;
                break;

              case 42:
                _context14.prev = 42;
                _context14.t1 = _context14["catch"](28);

                _iterator2.e(_context14.t1);

              case 45:
                _context14.prev = 45;

                _iterator2.f();

                return _context14.finish(45);

              case 48:
                return _context14.abrupt("return", result);

              case 51:
                _context14.prev = 51;
                _context14.t2 = _context14["catch"](1);
                this.error(options.serial, 'request', _context14.t2);
                return _context14.abrupt("return", {
                  success: false,
                  error: _context14.t2
                });

              case 55:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[1, 51], [4, 17, 20, 23], [28, 42, 45, 48]]);
      }));

      function request(_x16) {
        return _request.apply(this, arguments);
      }

      return request;
    }() // debug 规则: encoder 在输出解码前数据(baseEncode 例外)， decoder 输出解码后数据

  }, {
    key: "baseEncode",
    value: function baseEncode(_ref14) {
      var url = _ref14.url,
          options = _ref14.options;

      var _ref15 = options || {},
          body = _ref15.body,
          method = _ref15.method,
          others = (0, _objectWithoutProperties2.default)(_ref15, ["body", "method"]);

      method = method ? method.toUpperCase() : 'GET';
      url = this.resolveUrl(url || '');

      if (method === 'GET') {
        if (body && (0, _typeof2.default)(body) === 'object') {
          var query = Object.keys(body).map(function (key) {
            return key + '=' + encodeURIComponent(body[key]);
          }).join('&');
          url += (url.indexOf('?') > 0 ? '&' : '?') + query;
        }

        this.debug(options.serial, 'baseEncode', "".concat(method, ": ").concat(url));
        return {
          url: url,
          options: _objectSpread({
            method: method
          }, others)
        };
      } else {
        this.debug(options.serial, 'baseEncode', "".concat(method, ": ").concat(url));
        return {
          url: url,
          options: _objectSpread({
            body: body,
            method: method
          }, others)
        };
      }
    }
  }, {
    key: "baseDecode",
    value: function baseDecode(_ref16) {
      var success = _ref16.success,
          response = _ref16.response,
          others = (0, _objectWithoutProperties2.default)(_ref16, ["success", "response"]);

      if (response.ok) {
        return _objectSpread({
          success: true,
          response: response
        }, others);
      } else {
        return _objectSpread({
          success: false,
          error: new Error(response.status + ' ' + response.statusText),
          response: response
        }, others);
      }
    }
  }, {
    key: "textEncode",
    value: function textEncode(_ref17) {
      var url = _ref17.url,
          options = _ref17.options;

      var _ref18 = options || {},
          body = _ref18.body,
          headers = _ref18.headers,
          others = (0, _objectWithoutProperties2.default)(_ref18, ["body", "headers"]);

      this.debug(options.serial, 'textEncode', body);
      headers = _objectSpread({
        'Content-Type': 'text/plain'
      }, headers);
      return {
        url: url,
        options: _objectSpread({
          body: body,
          headers: headers
        }, others)
      };
    }
  }, {
    key: "textDecode",
    value: function () {
      var _textDecode = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15(_ref19) {
        var success, data, response, options, others;
        return _regenerator.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                success = _ref19.success, data = _ref19.data, response = _ref19.response, options = _ref19.options, others = (0, _objectWithoutProperties2.default)(_ref19, ["success", "data", "response", "options"]);
                _context15.next = 3;
                return response.text();

              case 3:
                data = _context15.sent;
                this.debug(options.serial, 'textDecode', data);
                return _context15.abrupt("return", _objectSpread({
                  success: true,
                  data: data,
                  response: response,
                  options: options
                }, others));

              case 6:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function textDecode(_x17) {
        return _textDecode.apply(this, arguments);
      }

      return textDecode;
    }()
  }, {
    key: "jsonEndode",
    value: function jsonEndode(_ref20) {
      var url = _ref20.url,
          options = _ref20.options;

      var _ref21 = options || {},
          body = _ref21.body,
          others = (0, _objectWithoutProperties2.default)(_ref21, ["body"]);

      this.debug(options.serial, 'jsonEndode', body);
      body = body ? JSON.stringify(body) : body;
      return {
        url: url,
        options: _objectSpread({
          body: body
        }, others)
      };
    }
  }, {
    key: "jsonDecode",
    value: function jsonDecode(_ref22) {
      var success = _ref22.success,
          data = _ref22.data,
          options = _ref22.options,
          others = (0, _objectWithoutProperties2.default)(_ref22, ["success", "data", "options"]);
      data = JSON.parse(data);
      this.debug(options.serial, 'jsonDecode', data);
      return _objectSpread({
        success: true,
        data: data,
        options: options
      }, others);
    }
  }, {
    key: "formDataEncode",
    value: function formDataEncode(_ref23) {
      var url = _ref23.url,
          options = _ref23.options;

      var _ref24 = options || {},
          body = _ref24.body,
          others = (0, _objectWithoutProperties2.default)(_ref24, ["body"]);

      this.debug(options.serial, 'formDataEncode', body);
      var formData = new FormData();

      var addValue = function addValue(name, value) {
        if (!value) {
          formData.append(name, value);
        } else if (value instanceof Array) {
          for (var i = 0; i < value.length; ++i) {
            addValue("".concat(name, "[").concat(i, "]"), value[i]);
          }
        } else if (value instanceof Object) {
          for (var key in value) {
            addValue("".concat(name, ".").concat(key), value[key]);
          }
        } else {
          formData.append(name, value);
        }
      };

      for (var key in body || {}) {
        addValue(key, body[key]);
      }

      return {
        url: url,
        options: _objectSpread({
          body: formData
        }, others)
      };
    } // 上传文件不能解析文件对象，限定为单层json，其它和 formDataEncode 一样

  }, {
    key: "uploadEncode",
    value: function uploadEncode(_ref25) {
      var url = _ref25.url,
          options = _ref25.options;

      var _ref26 = options || {},
          body = _ref26.body,
          others = (0, _objectWithoutProperties2.default)(_ref26, ["body"]);

      this.debug(options.serial, 'uploadEncode', body);
      var formData = new FormData();

      for (var key in body || {}) {
        formData.append(key, body[key] || '');
      }

      return {
        url: url,
        options: _objectSpread({
          body: formData
        }, others)
      };
    }
  }, {
    key: "uploadDecode",
    value: function uploadDecode(_ref27) {
      var success = _ref27.success,
          data = _ref27.data,
          options = _ref27.options,
          others = (0, _objectWithoutProperties2.default)(_ref27, ["success", "data", "options"]);
      this.debug(options.serial, 'uploadDecode', data);
      return _objectSpread({
        success: success,
        data: data,
        options: options
      }, others);
    }
  }], [{
    key: "serial",
    get: function get() {
      var serial = ++this.lastSerial;
      serial &= 0xFFFF;
      return "000".concat(serial.toString(16)).substr(-4);
    }
  }]);
  return Http;
}();

exports.default = Http;
Http.lastSerial = 0;