"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const matrix_1 = require("../src/matrix");
(0, globals_1.describe)('Matrix Operations Production Suite', () => {
    (0, globals_1.test)('should correctly identify dimensions and data', () => {
        const m = new matrix_1.Matrix([
            [1, 2, 3],
            [4, 5, 6]
        ]);
        (0, globals_1.expect)(m.rows).toBe(2);
        (0, globals_1.expect)(m.cols).toBe(3);
    });
    (0, globals_1.test)('should throw an error on jagged arrays', () => {
        const jaggedData = [
            [1, 2, 3],
            [4, 5] // Missing an element
        ];
        (0, globals_1.expect)(() => new matrix_1.Matrix(jaggedData)).toThrow();
    });
    (0, globals_1.test)('should correctly transpose a matrix', () => {
        const m = new matrix_1.Matrix([
            [1, 2],
            [3, 4],
            [5, 6]
        ]);
        const mT = m.transpose();
        (0, globals_1.expect)(mT.rows).toBe(2);
        (0, globals_1.expect)(mT.cols).toBe(3);
        (0, globals_1.expect)(mT.data).toEqual([
            [1, 3, 5],
            [2, 4, 6]
        ]);
    });
    (0, globals_1.test)('should correctly multiply two valid matrices', () => {
        // 2x3 Matrix
        const A = new matrix_1.Matrix([
            [1, 2, 3],
            [4, 5, 6]
        ]);
        // 3x2 Matrix
        const B = new matrix_1.Matrix([
            [7, 8],
            [9, 1],
            [2, 3]
        ]);
        const C = A.multiply(B); // Result should be 2x2
        (0, globals_1.expect)(C.rows).toBe(2);
        (0, globals_1.expect)(C.cols).toBe(2);
        (0, globals_1.expect)(C.data).toEqual([
            [31, 19],
            [85, 55]
        ]);
    });
    (0, globals_1.test)('should throw an error if multiplication dimensions mismatch', () => {
        const A = new matrix_1.Matrix([[1, 2]]);
        const B = new matrix_1.Matrix([[1, 2]]); // Cannot multiply 1x2 by 1x2
        (0, globals_1.expect)(() => A.multiply(B)).toThrow();
    });
});
