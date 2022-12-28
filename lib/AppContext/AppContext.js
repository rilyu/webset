"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
// AppContext.js

var AppContext = /*#__PURE__*/_react.default.createContext({
  app: null,
  // application 对象，尽量避免使用以防止过度依赖, 原有工程引用的 login, setting 的代码已封装到 http 内，无需在调用处引用
  navigator: null,
  // 至少提供 routeTo, switchTo 两个函数
  http: null // 至少提供 postJson, postJsonCache, clearAllCache, loadEnumData 四个函数
});
var _default = AppContext;
exports.default = _default;