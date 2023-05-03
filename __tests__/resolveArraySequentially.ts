import { describe, expect, test } from '@jest/globals';
const { resolveArraySequentially } = require('../src/questions');

describe('resolveArraySequentially', () => {
    test('should return correct result for array of promises', async () => {
        const fs = [
            () => new Promise((resolve) => setTimeout(() => resolve(1), Math.random() * 20 + 10)),
            (value: number) => new Promise((resolve) => setTimeout(() => resolve(value + 1), Math.random() * 20 + 10)),
            (value: number) => new Promise((resolve) => setTimeout(() => resolve(value * 2), Math.random() * 20 + 10)),
        ];
        const result = await resolveArraySequentially(fs);
        expect(result).toBe(16);
    });

    test('should handle empty array', async () => {
        const fs: Array<() => Promise<number>> = [];
        const result = await resolveArraySequentially(fs);
        expect(result).toBe(0);
    });

    test('should handle array with only one promise', async () => {
        const fs = [() => new Promise((resolve) => setTimeout(() => resolve(2), Math.random() * 20 + 10))];
        const result = await resolveArraySequentially(fs);
        expect(result).toBe(4);
    });

    test('should handle randomly generated array', async () => {
        const count = Math.floor(Math.random() * 50) + 50;
        const value = Array.from({ length: count }, () => Math.floor(Math.random() * 7) + 3);
        const fs = value.map(
            (v, i) =>
                (value = 0) =>
                    new Promise((resolve) =>
                        setTimeout(() => resolve(i % 10 === 0 ? v * 2 : v + value), Math.random() * 10 + 10),
                    ),
        );
        const result = await resolveArraySequentially(fs);
        expect(result).toBe(value.reduce((p, c, i) => (i % 10 === 0 ? c * 2 : p + c), 0) ** 2);
    });
});
