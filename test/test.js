import {expect} from "chai";
import {encode, decode} from "../src/index.js";

describe('Testing encode and decode functions', () => {
    it('Test: type string', () => {
        let data = 'Foo bar baz';

        let encoded = encode(data);
        let decoded = decode(encoded);

        expect(decoded).to.equal(data);
    });

    it('Test: type boolean', () => {
        let data = true;

        let encoded = encode(data);
        let decoded = decode(encoded);

        expect(decoded).to.equal(data);
    });

    it('Test: type int', () => {
        let data = 123;

        let encoded = encode(data);
        let decoded = decode(encoded);

        expect(decoded).to.equal(data);
    });

    it('Test: type float', () => {
        let data = 3.1414999961853027;

        let encoded = encode(data);
        let decoded = decode(encoded);

        expect(decoded).to.equal(data);
    });

    it('Test: type array', () => {
        let data = [1, 2, 3];

        let encoded = encode(data);
        let decoded = decode(encoded);

        expect(decoded).to.deep.equal(data);
    });

    it('Test: type object', () => {
        let data = { name: 'John', age: 30 };

        let encoded = encode(data);
        let decoded = decode(encoded);

        expect(decoded).to.deep.equal(data);
    });

    it('Test: type null', () => {
        let data = null;

        let encoded = encode(data);
        let decoded = decode(encoded);

        expect(decoded).to.equal(data);
    });

    it('Test: type undefined', () => {
        let data = undefined;

        let encoded = encode(data);
        let decoded = decode(encoded);

        expect(decoded).to.equal(data);
    });

    it('Test: nested array and object', () => {
        let data = {
            bool: true,
            test: 123,
            super: 3.1414999961853027,
            hello: 'world',
            arr: [4, 1, 2, 3],
            obj: {foo: 'bar'},
            nullable: null,
            und: undefined
        };

        let encoded = encode(data);
        let decoded = decode(encoded);

        expect(decoded).to.deep.equal(data);
    });
});
