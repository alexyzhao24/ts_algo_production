import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { MinPriorityQueue } from '../src/priorityQueue';

describe('MinPriorityQueue Production Suite', () => {
    let pq: MinPriorityQueue;

    beforeEach(() => {
        pq = new MinPriorityQueue();
    });

    test('should report empty initialization', () => {
        expect(pq.isEmpty()).toBe(true);
        expect(pq.peek()).toBeNull();
    });

    test('should extract elements in strict ascending order of priority', () => {
        pq.insert("low-priority task", 10);
        pq.insert("critical system emergency", 1);
        pq.insert("medium-priority ticket", 5);

        expect(pq.size()).toBe(3);
        
        // Lowest priority value numeric index represents highest urgency
        expect(pq.extractMin()?.value).toBe("critical system emergency");
        expect(pq.extractMin()?.value).toBe("medium-priority ticket");
        expect(pq.extractMin()?.value).toBe("low-priority task");
        expect(pq.isEmpty()).toBe(true);
    });

    test('should handle random insertion orders stably', () => {
        pq.insert("Task D", 4);
        pq.insert("Task B", 2);
        pq.insert("Task E", 5);
        pq.insert("Task A", 1);
        pq.insert("Task C", 3);

        expect(pq.peek()?.value).toBe("Task A");
        
        const sequence: string[] = [];
        while (!pq.isEmpty()) {
            sequence.push(pq.extractMin()?.value);
        }

        expect(sequence).toEqual(["Task A", "Task B", "Task C", "Task D", "Task E"]);
    });

    test('should handle edge bounds and empty extraction without breaking', () => {
        expect(pq.extractMin()).toBeNull();
        pq.insert("Solo item", 42);
        expect(pq.extractMin()?.value).toBe("Solo item");
        expect(pq.extractMin()).toBeNull();
    });
});