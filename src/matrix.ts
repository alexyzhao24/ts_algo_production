export class Matrix {
    public readonly rows: number;
    public readonly cols: number;
    public readonly data: number[][];

    constructor(data: number[][]) {
        if (!data || data.length === 0 || data[0].length === 0) {
            throw new Error("Matrix dimensions must be at least 1x1.");
        }
        
        // ensure rows are same length
        const firstRowLength = data[0].length;
        for (const row of data) {
            if (row.length !== firstRowLength) {
                throw new Error("All rows in a matrix must have the same number of columns.");
            }
        }

        this.rows = data.length;
        this.cols = firstRowLength;
        this.data = data;
    }

    /**
     * transpose the current matrix 
     * matrix $A^T$ where $(A^T)_{ij} = A_{ji}$
     */
    public transpose(): Matrix {
        const result: number[][] = Array.from({ length: this.cols }, () => 
            new Array(this.rows).fill(0)
        );

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result[j][i] = this.data[i][j];
            }
        }

        return new Matrix(result);
    }

    /**
     * Multiplies this matrix by another matrix using standard $O(n^3)$ dot product calculation.
     */
    public multiply(other: Matrix): Matrix {
        if (this.cols !== other.rows) {
            throw new Error(`Dimension mismatch: Cannot multiply a ${this.rows}x${this.cols} matrix by a ${other.rows}x${other.cols} matrix.`);
        }

        const result: number[][] = Array.from({ length: this.rows }, () => 
            new Array(other.cols).fill(0)
        );

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < other.cols; j++) {
                let sum = 0;
                for (let k = 0; k < this.cols; k++) {
                    sum += this.data[i][k] * other.data[k][j];
                }
                result[i][j] = sum;
            }
        }

        return new Matrix(result);
    }
}