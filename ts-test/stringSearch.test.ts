import { jest, describe, test, expect } from '@jest/globals';
import { StringSearch } from '../src/stringSearch';

describe('KMP String Search Production Suite', () => {
    test('should find single pattern match positions accurately', () => {
        const text = "abcxabcdeabc";
        const pattern = "abcd";
        expect(StringSearch.kmpSearch(text, pattern)).toEqual([4]);
    });

    test('should find multiple overlapping occurrences cleanly', () => {
        const text = "aaaaa";
        const pattern = "aa";
        // Matches start at indices 0, 1, 2, and 3
        expect(StringSearch.kmpSearch(text, pattern)).toEqual([0, 1, 2, 3]);
    });

    test('should return empty array if pattern does not exist', () => {
        const text = "abcdefg";
        const pattern = "xyz";
        expect(StringSearch.kmpSearch(text, pattern)).toEqual([]);
    });
});