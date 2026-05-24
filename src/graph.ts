import { MinPriorityQueue } from './priorityQueue';

export interface Edge {
    node: string;
    weight: number;
}

export class DirectedGraph {
    private adjacencyList: Map<string, Edge[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    public addNode(node: string): void {
        if (!this.adjacencyList.has(node)) {
            this.adjacencyList.set(node, []);
        }
    }

    public addEdge(from: string, to: string, weight: number): void {
        this.addNode(from);
        this.addNode(to);
        this.adjacencyList.get(from)!.push({ node: to, weight });
    }

    public getNeighbors(node: string): Edge[] {
        return this.adjacencyList.get(node) || [];
    }

    /**
     * Dijkstra's Shortest Path Algorithm
     * Finds the shortest path distances from a source node to all reachable nodes.
     */
    public dijkstra(source: string): Map<string, number> {
        const distances = new Map<string, number>();
        const pq = new MinPriorityQueue();

        // Initialize distances
        distances.set(source, 0);
        pq.insert(source, 0);

        while (!pq.isEmpty()) {
            const current = pq.extractMin();
            if (!current) break;

            const currentNode = current.value as string;
            const currentDistance = current.priority;

            // If we found a longer path in the queue than what we already processed, skip it
            if (currentDistance > (distances.get(currentNode) ?? Infinity)) {
                continue;
            }

            for (const edge of this.getNeighbors(currentNode)) {
                const newDistance = currentDistance + edge.weight;
                const oldDistance = distances.get(edge.node) ?? Infinity;

                if (newDistance < oldDistance) {
                    distances.set(edge.node, newDistance);
                    pq.insert(edge.node, newDistance);
                }
            }
        }

        return distances;
    }
}