import { describe, expect, test } from '@jest/globals';
const { whatIsTheSquaredResolvedValue } = require('../src/questions');

describe('whatIsTheSquaredResolvedValue', () => {
    test('should return the resolved value of a resolved promise', () => {
        const value = 10;
        const resolvedPromise = Promise.resolve(value);
        const f = () => resolvedPromise;
        return expect(whatIsTheSquaredResolvedValue(f)).resolves.toBe(value * value);
    });

    test('should return the resolved value of a promise that takes time to resolve', () => {
        const value = 20;
        const delayedPromise = new Promise((resolve) => setTimeout(() => resolve(value), 10));
        const f = () => delayedPromise;
        return expect(whatIsTheSquaredResolvedValue(f)).resolves.toBe(value * value);
    });
});
