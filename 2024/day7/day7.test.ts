// Tests using Vitest
import { describe, test, expect } from 'vitest';
import {
    evaluateExpression,
    generateOperatorCombinations,
    isValidEquation,
    totalCalibrationResult,
} from './lib';

// Sample input
const sampleInput = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

describe('Calibration Check', () => {
    test('generateOperatorCombinations should generate all combinations', () => {
        const result = generateOperatorCombinations(3);
        expect(result).toEqual([
            ['+', '+'],
            ['+', '*'],
            ['+', '||'],
            ['*', '+'],
            ['*', '*'],
            ['*', '||'],
            ['||', '+'],
            ['||', '*'],
            ['||', '||'],
        ]);
    });

    test('evaluateExpression should compute left-to-right evaluation', () => {
        expect(evaluateExpression([10, 19], ['*'])).toBe(190);
        expect(evaluateExpression([81, 40, 27], ['+', '*'])).toBe(3267);
        expect(evaluateExpression([15, 6], ['||'])).toBe(156);
        expect(evaluateExpression([17, 8, 14], ['||', '+'])).toBe(192);
    });

    test('isValidEquation should determine equation validity', () => {
        expect(isValidEquation({ target: 190, numbers: [10, 19] })).toBe(true);
        expect(isValidEquation({ target: 83, numbers: [17, 5] })).toBe(false);
        expect(isValidEquation({ target: 156, numbers: [15, 6] })).toBe(true);
    });

    test('totalCalibrationResult should compute the total sum of valid equations', () => {
        expect(totalCalibrationResult(sampleInput)).toBe(11387);
    });
});
