import { describe, expect, test } from 'vitest';
import {
    allSingleDirection,
    isDifferenceInLevelsBetweenOneAndThree,
} from './libs';

describe('DAY 2', () => {
    test('isDifferenceInLevelsBetweenOneAndThree', () => {
        const input1 = [1, 2, 3, 4, 5];
        const output1 = isDifferenceInLevelsBetweenOneAndThree(input1);
        expect(output1).toBe(true);

        const input2 = [1, 2, 4, 7, 10];
        const output2 = isDifferenceInLevelsBetweenOneAndThree(input2);
        expect(output2).toBe(true);

        const input3 = [11, 8, 5, 4, 1];
        const output3 = isDifferenceInLevelsBetweenOneAndThree(input3);
        expect(output3).toBe(true);

        const input4 = [11, 7];
        const output4 = isDifferenceInLevelsBetweenOneAndThree(input4);
        expect(output4).toBe(false);
    });

    test('allSingleDirection', () => {
        const input1 = [1, 2, 3, 5, 7];
        const output1 = allSingleDirection(input1);
        expect(output1).toBe(true);

        const input2 = [10, 6, 4, 2, 1];
        const output2 = allSingleDirection(input2);
        expect(output2).toBe(true);
    });
});
