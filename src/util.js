export const types = {
    end: 0,
    boolean: 1,
    int: 2,
    float: 3,
    string: 4,
    function: 5,
    array: 6,
    null: 7,
    object: 8,
    undefined: 9,
};

export const whichType = (input) => {
    switch (typeof input) {
        case 'boolean':
            return types.boolean;

        case 'number':
            if (Number.isInteger(input)) {
                return types.int;
            } else {
                return types.float;
            }

        case 'string':
            return types.string;

        case 'function':
            return types.function;

        case 'object':
            if (Array.isArray(input)) {
                return types.array;
            } else if (input === null) {
                return types.null;
            } else {
                return types.object;
            }

        case 'undefined':
            return types.undefined;

        default:
            throw new Error('Wrong data type: ' + typeof input);
    }
}
