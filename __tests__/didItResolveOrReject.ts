import { describe, expect, test } from '@jest/globals';
const { didItResolveOrReject, PromiseState } = require('../src/questions');

describe('didItResolveOrReject', () => {
    test('resolves', async () => {
        const f = () => Promise.resolve('resolved');
        const result = await didItResolveOrReject(f);
        expect(result).toBe(PromiseState.resolved);
    });

    test('rejects', async () => {
        const f = () => Promise.reject(new Error('rejected'));
        const result = await didItResolveOrReject(f);
        expect(result).toBe(PromiseState.rejected);
    });

    test('throws an error', async () => {
        const f = () =>
            new Promise(() => {
                throw new Error('error');
            });
        const result = await didItResolveOrReject(f);
        expect(result).toBe(PromiseState.rejected);
    });
});
