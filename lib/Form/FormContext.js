"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

// FormContext.js
var FormContext = /*#__PURE__*/_react.default.createContext({
  form: null,
  mode: null,
  fieldProps: null
});

var _default = FormContext;
exports.default = _default;