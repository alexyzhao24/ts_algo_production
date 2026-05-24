import { jest, describe, test, expect } from '@jest/globals';
import { SortingEngine } from '../src/sorting';

describe('Sorting Engine Production Suite', () => {
    const unsorted = [34, -5, 100, 0, 42, 2, 12, 2];
    const sortedExpected = [-5, 0, 2, 2, 12, 34, 42, 100];

    test('should sort perfectly using QuickSort execution tracks', () => {
        expect(SortingEngine.quickSort(unsorted)).toEqual(sortedExpected);
    });

    test('should sort perfectly using MergeSort recursion loops', () => {
        expect(SortingEngine.mergeSort(unsorted)).toEqual(sortedExpected);
    });

    test('should manage empty bounds or isolated elements smoothly', () => {
        expect(SortingEngine.quickSort([])).toEqual([]);
        expect(SortingEngine.mergeSort([42])).toEqual([42]);
    });
});