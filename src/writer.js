import {types, whichType} from "./util.js";

export default (data) => {
    return writeData(data).toString('base64');
};

const writeByte = (val) => {
    let buf = new Buffer(1);
        buf.writeInt8(val, 0);

    return buf;
}

const writeShort = (val) => {
    let buf = new Buffer(2);
        buf.writeInt16BE(val, 0);

    return buf;
}

const writeInt = (val) => {
    let buf = new Buffer(4);
        buf.writeInt32BE(val, 0);

    return buf;
}

const writeFloat = (val) => {
    let buf = new Buffer(4);
        buf.writeFloatBE(val, 0);

    return buf;
}

const writeString = (val) => {
    let buf = [];
        buf.push(writeShort(val.length));
        buf.push(new Buffer(val, 'utf8'));

    return Buffer.concat(buf);
}

const writeNone = () => {
    let buf = new Buffer(4);
        buf.writeUInt8(0, 0);

    return buf;
}

const writeEnd = () => {
    return writeByte(types.end);
}

const writeDataTypeAndName = (type, name = '') => {
    let buf = [];
        buf.push(writeByte(type));
        buf.push(writeString(name));

    return Buffer.concat(buf);
}

const writeData = (value, name = '') => {
    let buf = [],
        type = whichType(value);

    buf.push(writeDataTypeAndName(type, name));

    switch (type) {
        case types.boolean:
            buf.push(writeByte(value));
            break;

        case types.int:
            buf.push(writeInt(value));
            break;

        case types.float:
            buf.push(writeFloat(value));
            break;

        case types.string:
            buf.push(writeString(value));
            break;

        case types.array:
            for (let key in value) {
                buf.push(writeData(value[key], key));
            }
            buf.push(writeEnd());
            break

        case types.object:
            for (let key in value) {
                buf.push(writeData(value[key], key));
            }
            buf.push(writeEnd());
            break;

        case types.null:
        case types.undefined:
            buf.push(writeNone());
            break;
    }

    return Buffer.concat(buf);
}
