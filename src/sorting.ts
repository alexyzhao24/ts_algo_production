export class SortingEngine {
    /**
     * In-place QuickSort algorithm using a last-element pivot rule.
     */
    public static quickSort(arr: number[]): number[] {
        const copy = [...arr];
        this.runQuickSort(copy, 0, copy.length - 1);
        return copy;
    }

    private static runQuickSort(arr: number[], low: number, high: number): void {
        if (low < high) {
            const pivotIndex = this.partition(arr, low, high);
            this.runQuickSort(arr, low, pivotIndex - 1);
            this.runQuickSort(arr, pivotIndex + 1, high);
        }
    }

    private static partition(arr: number[], low: number, high: number): number {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    }

    /**
     * MergeSort algorithm returning a new sorted array.
     */
    public static mergeSort(arr: number[]): number[] {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = this.mergeSort(arr.slice(0, mid));
        const right = this.mergeSort(arr.slice(mid));

        return this.merge(left, right);
    }

    private static merge(left: number[], right: number[]): number[] {
        const result: number[] = [];
        let i = 0, j = 0;

        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
        }

        return result.concat(left.slice(i)).concat(right.slice(j));
    }
}