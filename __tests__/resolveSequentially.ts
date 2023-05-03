import { describe, expect, test, jest } from '@jest/globals';
const { resolveSequentially } = require('../src/questions');

function setTimeoutPromise(delay: number, value: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(value), delay);
    });
}

describe('resolveSequentially', () => {
    test('1 2 3', async () => {
        const f1 = jest.fn(() => setTimeoutPromise(30, 1));
        const f2 = jest.fn((x: number) => setTimeoutPromise(20, 2 + x));
        const f3 = jest.fn((x: number) => setTimeoutPromise(1, 3 + x));

        const results = await resolveSequentially(f1, f2, f3);

        expect(f1).toHaveBeenCalled();
        expect(f2).toHaveBeenCalledWith(1);
        expect(f3).toHaveBeenCalledWith(3);
        expect(results).toEqual(6 * 6);
    });

    test('1 1 1', async () => {
        const f1 = jest.fn(() => setTimeoutPromise(1, 1));
        const f2 = jest.fn((x: number) => setTimeoutPromise(20, 1 + x));
        const f3 = jest.fn((x: number) => setTimeoutPromise(30, 1 + x));

        const results = await resolveSequentially(f1, f2, f3);

        expect(f1).toHaveBeenCalled();
        expect(f2).toHaveBeenCalledWith(1);
        expect(f3).toHaveBeenCalledWith(2);
        expect(results).toEqual(3 * 3);
    });

    test('rand rand rand', async () => {
        const [t1, t2, t3] = new Array(3).fill(null).map(() => Math.floor(Math.random() * 30) + 10);
        const [a, b, c] = new Array(3).fill(null).map(() => Math.floor(Math.random() * 100) + 1);
        const f1 = jest.fn(() => setTimeoutPromise(t1 + t2 + t3, a));
        const f2 = jest.fn((x: number) => setTimeoutPromise(t1 + t2, b + x));
        const f3 = jest.fn((x: number) => setTimeoutPromise(t1, c + x));

        const results = await resolveSequentially(f1, f2, f3);

        expect(f1).toHaveBeenCalled();
        expect(f2).toHaveBeenCalledWith(a);
        expect(f3).toHaveBeenCalledWith(a + b);
        expect(results).toEqual((a + b + c) ** 2);
    });

    test('rand rand rand [Random delay]', async () => {
        const [t1, t2, t3] = new Array(3).fill(null).map(() => Math.floor(Math.random() * 50) + 10);
        const [a, b, c] = new Array(3).fill(null).map(() => Math.floor(Math.random() * 100) + 1);
        const f1 = jest.fn(() => setTimeoutPromise(t1, a));
        const f2 = jest.fn((x: number) => setTimeoutPromise(t2, b + x));
        const f3 = jest.fn((x: number) => setTimeoutPromise(t3, c + x));

        const results = await resolveSequentially(f1, f2, f3);

        expect(f1).toHaveBeenCalled();
        expect(f2).toHaveBeenCalledWith(a);
        expect(f3).toHaveBeenCalledWith(a + b);
        expect(results).toEqual((a + b + c) ** 2);
    });
});
