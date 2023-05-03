import { describe, expect, test } from '@jest/globals';
import { resolveSequentiallyAndConcurrently } from '../src/questions';

describe('resolveSequentiallyAndConcurrently', () => {
    test('[1,2],[3],[4,5,6]', async () => {
        const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
        const firstGroup = [() => delay(100).then(() => 1), () => delay(200).then(() => 2)];
        const secondGroup = [() => delay(300).then(() => 3)];
        const thirdGroup = [
            () => delay(100).then(() => 4),
            () => delay(200).then(() => 5),
            () => delay(300).then(() => 6),
        ];
        const start = Date.now();
        const result = await resolveSequentiallyAndConcurrently([firstGroup, secondGroup, thirdGroup]);
        const duration = Date.now() - start;

        expect(result).toEqual([[1, 2], [3], [4, 5, 6]]);
        expect(duration).toBeGreaterThanOrEqual(600);
        expect(duration).toBeLessThan(700);
    });

    test('[4,5,6],[3],[1,2]', async () => {
        const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
        const firstGroup = [() => delay(100).then(() => 1), () => delay(200).then(() => 2)];
        const secondGroup = [() => delay(300).then(() => 3)];
        const thirdGroup = [
            () => delay(100).then(() => 4),
            () => delay(200).then(() => 5),
            () => delay(300).then(() => 6),
        ];
        const start = Date.now();
        const result = await resolveSequentiallyAndConcurrently([thirdGroup, secondGroup, firstGroup]);
        const duration = Date.now() - start;

        expect(result).toEqual([[4, 5, 6], [3], [1, 2]]);
        expect(duration).toBeGreaterThanOrEqual(600);
        expect(duration).toBeLessThan(700);
    });

    test('[random]', async () => {
        const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
        const groups = 100;
        const values = Array.from({ length: groups }, () => {
            const length = Math.floor(Math.random() * 2) + 3;
            return Array.from({ length }, () => Math.floor(Math.random() * 5));
        });
        const input = values.map((group) => group.map((v) => () => delay(v * 100).then(() => v)));
        const maxDuration = Math.max(...values.map((group) => group.reduce((p, c) => p + c, 0))) * 100;

        const start = Date.now();
        const result = await resolveSequentiallyAndConcurrently(input);
        const duration = Date.now() - start;

        expect(result).toEqual(values);
        expect(duration).toBeGreaterThanOrEqual(maxDuration);
        expect(duration).toBeLessThan(maxDuration + 100);
    });

    test('should work with empty groups', async () => {
        const emptyGroup: (() => Promise<number>)[] = [];
        const result = await resolveSequentiallyAndConcurrently([emptyGroup]);
        expect(result).toEqual([[]]);
    });

    test('should work with empty input', async () => {
        const result = await resolveSequentiallyAndConcurrently([]);
        expect(result).toEqual([]);
    });
    test('should work with single function promise', async () => {
        const singleFunction = [() => Promise.resolve(1)];
        const result = await resolveSequentiallyAndConcurrently([singleFunction]);
        expect(result).toEqual([[1]]);
    });
});
