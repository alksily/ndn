import {types} from "./util.js";

export default (data) => {
    let [[, , result]] = readData(Buffer.from(data, 'base64'));

    return result;
};

const readByte = (buffer) => {
    return [
        buffer.readInt8(0),
        buffer.slice(1),
    ];
}

const readShort = (buffer) => {
    return [
        buffer.readInt16BE(0),
        buffer.slice(2),
    ];
}

const readInt = (buffer) => {
    return [
        buffer.readInt32BE(0),
        buffer.slice(4),
    ];
}

const readFloat = (buffer) => {
    return [
        buffer.readFloatBE(0),
        buffer.slice(4),
    ];
}

const readString = (buffer) => {
    let length;

    [length, buffer] = readShort(buffer);

    return [
        buffer.toString('utf8', 0, length),
        buffer.slice(length),
    ];
}

const readNone = (value, buffer) => {
    return [
        value,
        buffer.slice(4)
    ];
}

const readDataName = (buffer) => {
    let type, name = '';

    [type, buffer] = readByte(buffer);

    switch (type) {
        default:
            [name, buffer] = readString(buffer);

            return [
                [type, name],
                buffer,
            ]

        case types.end:
            return [
                [type, name],
                buffer,
            ]
    }
}

const readData = (buffer) => {
    let type, name, value = '';

    [[type, name], buffer] = readDataName(buffer);

    switch (type) {
        case types.boolean:
            [value, buffer] = readByte(buffer);
            value = !!value;
            break;

        case types.int:
            [value, buffer] = readInt(buffer);
            break;

        case types.float:
            [value, buffer] = readFloat(buffer);
            break;

        case types.string:
            [value, buffer] = readString(buffer);
            break;

        case types.array:
            value = [];

            while (true) {
                let t, val;

                [[t, , val], buffer] = readData(buffer);

                if (t !== types.end) {
                    value.push(val);
                } else {
                    break;
                }
            }
            break;

        case types.object:
            value = {};

            while (true) {
                let t, n, val;

                [[t, n, val], buffer] = readData(buffer);

                if (t !== types.end) {
                    value[n] = val;
                } else {
                    break;
                }
            }
            break;

        case types.null:
            [value, buffer] = readNone(null, buffer);
            break;

        case types.undefined:
            [value, buffer] = readNone(undefined, buffer);
            break;
    }

    return [[type, name, value], buffer];
}
