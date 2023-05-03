import { describe, expect, test, jest } from '@jest/globals';
const { resolveConcurrently } = require('../src/questions');

describe('resolveConcurrently', () => {
    test('1 2 3', async () => {
        const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
        const f1 = jest.fn(() => delay(100).then(() => 1));
        const f2 = jest.fn(() => delay(50).then(() => 2));
        const f3 = jest.fn(() => delay(200).then(() => 3));
        const start = Date.now();
        const result = await resolveConcurrently([f1, f2, f3]);
        const end = Date.now();
        const duration = end - start;

        expect(f1).toHaveBeenCalled();
        expect(f2).toHaveBeenCalled();
        expect(f3).toHaveBeenCalled();
        expect(result).toEqual([1, 4, 9]);
        expect(duration).toBeGreaterThanOrEqual(200);
        expect(duration).toBeLessThan(250);
    });

    test('rand rand rand', async () => {
        const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
        const delays = new Array(3).fill(null).map(() => Math.floor(Math.random() * 100) + 100);
        const values = new Array(3).fill(null).map(() => Math.floor(Math.random() * 100) + 1);
        const functions = values.map((v, i) => jest.fn(() => delay(delays[i]).then(() => v)));
        const output = values.map((x) => x * x);
        const maxDelay = Math.max(...delays);

        const start = Date.now();
        const result = await resolveConcurrently(functions);
        const end = Date.now();
        const duration = end - start;

        functions.forEach((f) => expect(f).toHaveBeenCalled());
        expect(result).toEqual(output);
        expect(duration).toBeGreaterThanOrEqual(maxDelay - 10);
        expect(duration).toBeLessThan(maxDelay + 50);
    });

    test('rand ... rand', async () => {
        const count = Math.floor(Math.random() * 100) + 30;

        const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
        const delays = new Array(count).fill(null).map(() => Math.floor(Math.random() * 100) + 100);
        const values = new Array(count).fill(null).map(() => Math.floor(Math.random() * 100) + 1);
        const functions = values.map((v, i) => jest.fn(() => delay(delays[i]).then(() => v)));
        const output = values.map((x) => x * x);
        const maxDelay = Math.max(...delays);

        const start = Date.now();
        const result = await resolveConcurrently(functions);
        const end = Date.now();
        const duration = end - start;

        functions.forEach((f) => expect(f).toHaveBeenCalled());
        expect(result).toEqual(output);
        expect(duration).toBeGreaterThanOrEqual(maxDelay);
        expect(duration).toBeLessThan(maxDelay + 50);
    });
});
