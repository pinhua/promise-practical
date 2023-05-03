import { describe, expect, test } from '@jest/globals';
const { didTheyResolveOrReject, PromiseState } = require('../src/questions');

describe('didTheyResolveOrReject', () => {
    test('resolves all the promises', async () => {
        const f1 = () => Promise.resolve(1);
        const f2 = () => Promise.resolve(2);
        const f3 = () => Promise.resolve(3);
        const result = await didTheyResolveOrReject([f1, f2, f3]);
        expect(result).toEqual([PromiseState.resolved, PromiseState.resolved, PromiseState.resolved]);
    });

    test('rejects all the promises', async () => {
        const f1 = () => Promise.reject(new Error('error'));
        const f2 = () => Promise.reject(new Error('error'));
        const f3 = () => Promise.reject(new Error('error'));
        const result = await didTheyResolveOrReject([f1, f2, f3]);
        expect(result).toEqual([PromiseState.rejected, PromiseState.rejected, PromiseState.rejected]);
    });

    test('resolves and rejects mixed promises', async () => {
        const f1 = () => Promise.resolve(1);
        const f2 = () => Promise.reject(new Error('error'));
        const f3 = () => Promise.resolve(3);
        const result = await didTheyResolveOrReject([f1, f2, f3]);
        expect(result).toEqual([PromiseState.resolved, PromiseState.rejected, PromiseState.resolved]);
    });

    test('resolves and rejects mixed promises - 100 random', async () => {
        const source = new Array(100).fill(null).map(() => Math.random() > 0.5);
        const input = source.map((r, i) => () => r ? Promise.resolve(i) : Promise.reject(i));
        const output = source.map((r) => (r ? PromiseState.resolved : PromiseState.rejected));
        const result = await didTheyResolveOrReject(input);
        expect(result).toEqual(output);
    });
});
