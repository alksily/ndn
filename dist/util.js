"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whichType = exports.types = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var types = {
  end: 0,
  "boolean": 1,
  "int": 2,
  "float": 3,
  string: 4,
  "function": 5,
  array: 6,
  "null": 7,
  object: 8,
  undefined: 9
};
exports.types = types;
var whichType = function whichType(input) {
  switch (_typeof(input)) {
    case 'boolean':
      return types["boolean"];
    case 'number':
      if (Number.isInteger(input)) {
        return types["int"];
      } else {
        return types["float"];
      }
    case 'string':
      return types.string;
    case 'function':
      return types["function"];
    case 'object':
      if (Array.isArray(input)) {
        return types.array;
      } else if (input === null) {
        return types["null"];
      } else {
        return types.object;
      }
    case 'undefined':
      return types.undefined;
    default:
      throw new Error('Wrong data type: ' + _typeof(input));
  }
};
exports.whichType = whichType;