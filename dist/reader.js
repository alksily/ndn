"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _util = require("./util.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var _default = function _default(data) {
  var _readData = readData(Buffer.from(data, 'base64')),
    _readData2 = _slicedToArray(_readData, 1),
    _readData2$ = _slicedToArray(_readData2[0], 3),
    result = _readData2$[2];
  return result;
};
exports["default"] = _default;
var readByte = function readByte(buffer) {
  return [buffer.readInt8(0), buffer.slice(1)];
};
var readShort = function readShort(buffer) {
  return [buffer.readInt16BE(0), buffer.slice(2)];
};
var readInt = function readInt(buffer) {
  return [buffer.readInt32BE(0), buffer.slice(4)];
};
var readFloat = function readFloat(buffer) {
  return [buffer.readFloatBE(0), buffer.slice(4)];
};
var readString = function readString(buffer) {
  var length;
  var _readShort = readShort(buffer);
  var _readShort2 = _slicedToArray(_readShort, 2);
  length = _readShort2[0];
  buffer = _readShort2[1];
  return [buffer.toString('utf8', 0, length), buffer.slice(length)];
};
var readNone = function readNone(value, buffer) {
  return [value, buffer.slice(4)];
};
var readDataName = function readDataName(buffer) {
  var type,
    name = '';
  var _readByte = readByte(buffer);
  var _readByte2 = _slicedToArray(_readByte, 2);
  type = _readByte2[0];
  buffer = _readByte2[1];
  switch (type) {
    default:
      var _readString = readString(buffer);
      var _readString2 = _slicedToArray(_readString, 2);
      name = _readString2[0];
      buffer = _readString2[1];
      return [[type, name], buffer];
    case _util.types.end:
      return [[type, name], buffer];
  }
};
var readData = function readData(buffer) {
  var type,
    name,
    value = '';
  var _readDataName = readDataName(buffer);
  var _readDataName2 = _slicedToArray(_readDataName, 2);
  var _readDataName2$ = _slicedToArray(_readDataName2[0], 2);
  type = _readDataName2$[0];
  name = _readDataName2$[1];
  buffer = _readDataName2[1];
  switch (type) {
    case _util.types["boolean"]:
      var _readByte3 = readByte(buffer);
      var _readByte4 = _slicedToArray(_readByte3, 2);
      value = _readByte4[0];
      buffer = _readByte4[1];
      value = !!value;
      break;
    case _util.types["int"]:
      var _readInt = readInt(buffer);
      var _readInt2 = _slicedToArray(_readInt, 2);
      value = _readInt2[0];
      buffer = _readInt2[1];
      break;
    case _util.types["float"]:
      var _readFloat = readFloat(buffer);
      var _readFloat2 = _slicedToArray(_readFloat, 2);
      value = _readFloat2[0];
      buffer = _readFloat2[1];
      break;
    case _util.types.string:
      var _readString3 = readString(buffer);
      var _readString4 = _slicedToArray(_readString3, 2);
      value = _readString4[0];
      buffer = _readString4[1];
      break;
    case _util.types.array:
      value = [];
      while (true) {
        var t = void 0,
          val = void 0;
        var _readData3 = readData(buffer);
        var _readData4 = _slicedToArray(_readData3, 2);
        var _readData4$ = _slicedToArray(_readData4[0], 3);
        t = _readData4$[0];
        val = _readData4$[2];
        buffer = _readData4[1];
        if (t !== _util.types.end) {
          value.push(val);
        } else {
          break;
        }
      }
      break;
    case _util.types.object:
      value = {};
      while (true) {
        var _t = void 0,
          n = void 0,
          _val = void 0;
        var _readData5 = readData(buffer);
        var _readData6 = _slicedToArray(_readData5, 2);
        var _readData6$ = _slicedToArray(_readData6[0], 3);
        _t = _readData6$[0];
        n = _readData6$[1];
        _val = _readData6$[2];
        buffer = _readData6[1];
        if (_t !== _util.types.end) {
          value[n] = _val;
        } else {
          break;
        }
      }
      break;
    case _util.types["null"]:
      var _readNone = readNone(null, buffer);
      var _readNone2 = _slicedToArray(_readNone, 2);
      value = _readNone2[0];
      buffer = _readNone2[1];
      break;
    case _util.types.undefined:
      var _readNone3 = readNone(undefined, buffer);
      var _readNone4 = _slicedToArray(_readNone3, 2);
      value = _readNone4[0];
      buffer = _readNone4[1];
      break;
  }
  return [[type, name, value], buffer];
};