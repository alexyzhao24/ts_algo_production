export interface QueueElement {
    priority: number;
    value: any;
}

export class MinPriorityQueue {
    private heap: QueueElement[];

    constructor() {
        this.heap = [];
    }

    public size(): number {
        return this.heap.length;
    }

    public isEmpty(): boolean {
        return this.heap.length === 0;
    }

    public peek(): QueueElement | null {
        return this.isEmpty() ? null : this.heap[0];
    }

    /**
     * Inserts a value with a specific priority and bubbles it up to its valid home.
     */
    public insert(value: any, priority: number): void {
        const element: QueueElement = { value, priority };
        this.heap.push(element);
        this.bubbleUp(this.heap.length - 1);
    }

    /**
     * Extracts and returns the lowest priority element, rebuilding the heap structure.
     */
    public extractMin(): QueueElement | null {
        if (this.isEmpty()) return null;
        
        const min = this.heap[0];
        const end = this.heap.pop();
        
        if (this.heap.length > 0 && end !== undefined) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        
        return min;
    }

    private bubbleUp(index: number): void {
        const element = this.heap[index];
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            
            // If the element's priority is higher or equal to its parent, heap property is satisfied
            if (element.priority >= parent.priority) break;
            
            // Swap elements
            this.heap[index] = parent;
            index = parentIndex;
        }
        this.heap[index] = element;
    }

    private sinkDown(index: number): void {
        const length = this.heap.length;
        const element = this.heap[index];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild: QueueElement | undefined;
            let rightChild: QueueElement | undefined;
            let swapIndex: number | null = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swapIndex = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swapIndex === null && rightChild.priority < element.priority) ||
                    (swapIndex !== null && leftChild !== undefined && rightChild.priority < leftChild.priority)
                ) {
                    swapIndex = rightChildIndex;
                }
            }

            if (swapIndex === null) break;

            this.heap[index] = this.heap[swapIndex];
            index = swapIndex;
        }
        this.heap[index] = element;
    }
}