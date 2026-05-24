import { jest, describe, test, expect } from '@jest/globals';
import { Matrix } from '../src/matrix';

describe('Matrix Operations Production Suite', () => {
    
    test('should correctly identify dimensions and data', () => {
        const m = new Matrix([
            [1, 2, 3],
            [4, 5, 6]
        ]);
        expect(m.rows).toBe(2);
        expect(m.cols).toBe(3);
    });

    test('should throw an error on jagged arrays', () => {
        const jaggedData = [
            [1, 2, 3],
            [4, 5] // Missing an element
        ];
        expect(() => new Matrix(jaggedData)).toThrow();
    });

    test('should correctly transpose a matrix', () => {
        const m = new Matrix([
            [1, 2],
            [3, 4],
            [5, 6]
        ]);
        const mT = m.transpose();

        expect(mT.rows).toBe(2);
        expect(mT.cols).toBe(3);
        expect(mT.data).toEqual([
            [1, 3, 5],
            [2, 4, 6]
        ]);
    });

    test('should correctly multiply two valid matrices', () => {
        // 2x3 Matrix
        const A = new Matrix([
            [1, 2, 3],
            [4, 5, 6]
        ]);
        // 3x2 Matrix
        const B = new Matrix([
            [7, 8],
            [9, 1],
            [2, 3]
        ]);

        const C = A.multiply(B); // Result should be 2x2

        expect(C.rows).toBe(2);
        expect(C.cols).toBe(2);
        expect(C.data).toEqual([
            [31, 19],
            [85, 55]
        ]);
    });

    test('should throw an error if multiplication dimensions mismatch', () => {
        const A = new Matrix([[1, 2]]);
        const B = new Matrix([[1, 2]]); // Cannot multiply 1x2 by 1x2
        
        expect(() => A.multiply(B)).toThrow();
    });
});