"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = exports.decode = void 0;
var _writer = _interopRequireDefault(require("./writer.js"));
var _reader = _interopRequireDefault(require("./reader.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var encode = function encode(data) {
  return (0, _writer["default"])(data);
};
exports.encode = encode;
var decode = function decode(data) {
  return (0, _reader["default"])(data);
};
exports.decode = decode;