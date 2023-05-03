import { describe, expect, test } from '@jest/globals';
import { whatAreTheirSquaredResolvedValue } from '../src/questions';

describe('whatAreTheirSquaredResolvedValue', () => {
    test('resolves all the promises - 1,2,3', async () => {
        const f1 = () => Promise.resolve(1);
        const f2 = () => Promise.resolve(2);
        const f3 = () => Promise.resolve(3);
        const result = await whatAreTheirSquaredResolvedValue([f1, f2, f3]);
        expect(result).toEqual([1, 4, 9]);
    });

    test('resolves all the promises - 3,2,1', async () => {
        const f1 = () => Promise.resolve(1);
        const f2 = () => Promise.resolve(2);
        const f3 = () => Promise.resolve(3);
        const result = await whatAreTheirSquaredResolvedValue([f3, f2, f1]);
        expect(result).toEqual([9, 4, 1]);
    });

    test('resolves empty array of promises', async () => {
        const result = await whatAreTheirSquaredResolvedValue([]);
        expect(result).toEqual([]);
    });

    test('resolved all the promise - 100 random values', async () => {
        const source = new Array(100).fill(null).map(() => Math.ceil(Math.random() * 100) + 1);
        const input = source.map((x) => () => Promise.resolve(x));
        const output = source.map((x) => x * x);
        const result = await whatAreTheirSquaredResolvedValue(input);
        expect(result).toEqual(output);
    });
});
