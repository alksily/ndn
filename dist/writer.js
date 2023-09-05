"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _util = require("./util.js");
var _default = function _default(data) {
  return writeData(data).toString('base64');
};
exports["default"] = _default;
var writeByte = function writeByte(val) {
  var buf = new Buffer(1);
  buf.writeInt8(val, 0);
  return buf;
};
var writeShort = function writeShort(val) {
  var buf = new Buffer(2);
  buf.writeInt16BE(val, 0);
  return buf;
};
var writeInt = function writeInt(val) {
  var buf = new Buffer(4);
  buf.writeInt32BE(val, 0);
  return buf;
};
var writeFloat = function writeFloat(val) {
  var buf = new Buffer(4);
  buf.writeFloatBE(val, 0);
  return buf;
};
var writeString = function writeString(val) {
  var buf = [];
  buf.push(writeShort(val.length));
  buf.push(new Buffer(val, 'utf8'));
  return Buffer.concat(buf);
};
var writeNone = function writeNone() {
  var buf = new Buffer(4);
  buf.writeUInt8(0, 0);
  return buf;
};
var writeEnd = function writeEnd() {
  return writeByte(_util.types.end);
};
var writeDataTypeAndName = function writeDataTypeAndName(type) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var buf = [];
  buf.push(writeByte(type));
  buf.push(writeString(name));
  return Buffer.concat(buf);
};
var writeData = function writeData(value) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var buf = [],
    type = (0, _util.whichType)(value);
  buf.push(writeDataTypeAndName(type, name));
  switch (type) {
    case _util.types["boolean"]:
      buf.push(writeByte(value));
      break;
    case _util.types["int"]:
      buf.push(writeInt(value));
      break;
    case _util.types["float"]:
      buf.push(writeFloat(value));
      break;
    case _util.types.string:
      buf.push(writeString(value));
      break;
    case _util.types.array:
      for (var key in value) {
        buf.push(writeData(value[key], key));
      }
      buf.push(writeEnd());
      break;
    case _util.types.object:
      for (var _key in value) {
        buf.push(writeData(value[_key], _key));
      }
      buf.push(writeEnd());
      break;
    case _util.types["null"]:
    case _util.types.undefined:
      buf.push(writeNone());
      break;
  }
  return Buffer.concat(buf);
};