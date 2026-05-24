import { AlgoEngine } from '../src/index'; 
describe('AlgoEngine Baseline Tests', () => {
    let engine: AlgoEngine;

    beforeEach(() => {
        engine = new AlgoEngine();
    });

    test('should correctly return array length', () => {
        const sampleArray = [10, 20, 30, 40];
        expect(engine.getElementCount(sampleArray)).toBe(4);
    });

    test('should handle null bounds safely', () => {
        expect(engine.getElementCount(null)).toBe(0);
    });
});