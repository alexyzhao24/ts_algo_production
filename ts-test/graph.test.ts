import { describe, test, expect } from '@jest/globals';
import { DirectedGraph } from '../src/graph';

describe('DirectedGraph & Dijkstra Production Suite', () => {
    test('should correctly find shortest paths in a weighted graph', () => {
        const graph = new DirectedGraph();
        
        // Setup a standard routing topology
        graph.addEdge('A', 'B', 4);
        graph.addEdge('A', 'C', 2);
        graph.addEdge('B', 'C', 5);
        graph.addEdge('B', 'D', 10);
        graph.addEdge('C', 'D', 3);
        graph.addEdge('D', 'E', 2);
        graph.addEdge('C', 'E', 12);

        const shortPaths = graph.dijkstra('A');

        expect(shortPaths.get('A')).toBe(0);
        expect(shortPaths.get('C')).toBe(2); // Direct path A->C (2)
        expect(shortPaths.get('B')).toBe(4); // Direct path A->B (4)
        expect(shortPaths.get('D')).toBe(5); // Optimized path A->C->D (2+3 = 5)
        expect(shortPaths.get('E')).toBe(7); // Optimized path A->C->D->E (2+3+2 = 7)
    });

    test('should handle completely unreachable nodes gracefully', () => {
        const graph = new DirectedGraph();
        graph.addEdge('A', 'B', 1);
        graph.addNode('Z'); // Isolated node

        const distances = graph.dijkstra('A');
        expect(distances.has('Z')).toBe(false);
    });
});