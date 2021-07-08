"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _Http2 = _interopRequireDefault(require("./Http"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var SecureHttp = /*#__PURE__*/function (_Http) {
  (0, _inherits2.default)(SecureHttp, _Http);

  var _super = _createSuper(SecureHttp);

  function SecureHttp(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SecureHttp);
    _this = _super.call(this, props);

    var _ref = props || {},
        crypt = _ref.crypt,
        cryptPassword = _ref.cryptPassword,
        cryptVector = _ref.cryptVector;

    _this.crypt = !!crypt;
    _this.cryptPassword = cryptPassword || '';
    _this.cryptVector = cryptVector || '';
    return _this;
  }

  (0, _createClass2.default)(SecureHttp, [{
    key: "postJson",
    value: function () {
      var _postJson = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref2) {
        var url, params, options, encoders, decoders, result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = _ref2.url, params = _ref2.params, options = _ref2.options;
                options = _objectSpread({
                  method: 'POST',
                  body: params,
                  crypt: this.crypt
                }, options);
                encoders = [this.baseEncode.bind(this), this.jsonEndode.bind(this), this.secureEncode.bind(this), this.textEncode.bind(this)];
                decoders = [this.baseDecode.bind(this), this.textDecode.bind(this), this.secureDecode.bind(this), this.jsonDecode.bind(this)];
                _context.next = 6;
                return this.request({
                  url: url,
                  options: options,
                  encoders: encoders,
                  decoders: decoders
                });

              case 6:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function postJson(_x) {
        return _postJson.apply(this, arguments);
      }

      return postJson;
    }()
  }, {
    key: "secureEncode",
    value: function secureEncode(_ref3) {
      var url = _ref3.url,
          options = _ref3.options;

      var _ref4 = options || {},
          body = _ref4.body,
          crypt = _ref4.crypt,
          others = (0, _objectWithoutProperties2.default)(_ref4, ["body", "crypt"]);

      this.debug(options.serial, 'secureEncode', body);
      body = crypt ? this.encrypt(body) : body;
      return {
        url: url,
        options: _objectSpread({
          body: body,
          crypt: crypt
        }, others)
      };
    }
  }, {
    key: "secureDecode",
    value: function secureDecode(_ref5) {
      var success = _ref5.success,
          data = _ref5.data,
          options = _ref5.options,
          others = (0, _objectWithoutProperties2.default)(_ref5, ["success", "data", "options"]);

      var _ref6 = options || {},
          crypt = _ref6.crypt;

      data = crypt ? this.decrypt(data) : data;
      this.debug(options.serial, 'secureDecode', data);
      return _objectSpread({
        success: success,
        data: data,
        options: options
      }, others);
    }
  }, {
    key: "encrypt",
    value: function encrypt(text) {
      var key = _cryptoJs.default.enc.Latin1.parse(this.cryptPassword);

      var iv = _cryptoJs.default.enc.Latin1.parse(this.cryptVector);

      var encrypted = _cryptoJs.default.TripleDES.encrypt(text, key, {
        iv: iv,
        mode: _cryptoJs.default.mode.CBC,
        padding: _cryptoJs.default.pad.Pkcs7
      });

      var encryptedBase64 = encrypted.ciphertext.toString(_cryptoJs.default.enc.Base64);
      return encryptedBase64;
    }
  }, {
    key: "decrypt",
    value: function decrypt(text) {
      var key = _cryptoJs.default.enc.Latin1.parse(this.cryptPassword);

      var iv = _cryptoJs.default.enc.Latin1.parse(this.cryptVector);

      text = text.replace(/(\s*)/g, '');

      var decrypted = _cryptoJs.default.TripleDES.decrypt(text, key, {
        iv: iv,
        mode: _cryptoJs.default.mode.CBC,
        padding: _cryptoJs.default.pad.Pkcs7
      });

      var decryptedText = decrypted.toString(_cryptoJs.default.enc.Utf8);
      return decryptedText;
    }
  }]);
  return SecureHttp;
}(_Http2.default);

exports.default = SecureHttp;