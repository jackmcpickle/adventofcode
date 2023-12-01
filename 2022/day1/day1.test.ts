import { describe, expect, test } from 'vitest';
import {
    findMaxCaloriesIndex,
    getCaloriesTotals,
    getGroupsFromFile,
    sumCalories,
} from './utils';

describe('CarryGroup', () => {
    test('getCaloriesIndex', () => {
        expect(
            getCaloriesTotals([
                [1000, 2000, 3000],
                [1, 2, 3, 4],
            ]),
        ).toEqual([6000, 10]);
        expect(getCaloriesTotals([[2, 3, 4]])).toEqual([9]);
    });

    test('findMaxCaloriesIndex', () => {
        expect(findMaxCaloriesIndex([1000, 3000, 2000]).index).toEqual(1);
        expect(findMaxCaloriesIndex([1000, 3000, 2000]).max).toEqual(3000);
        expect(findMaxCaloriesIndex([-1, 0, 5, 10]).index).toEqual(3);
        expect(findMaxCaloriesIndex([-1, 0, 5, 10]).max).toEqual(10);
    });

    test('sumCalories', () => {
        expect(sumCalories([1000, 2000, 3000])).toEqual(6000);
        expect(sumCalories([1, 2, 3])).toEqual(6);
        expect(sumCalories([-11, 2, 3])).toEqual(-6);
    });

    test('getGroupsFromFile', () => {
        expect(
            getGroupsFromFile('1000\n2000\n3000\n \n1000\n2000\n3000\n'),
        ).toEqual({
            0: [1000, 2000, 3000],
            1: [1000, 2000, 3000],
        });
        expect(getGroupsFromFile('1\n2\n3\n4\n0')).toEqual({
            0: [1, 2, 3, 4],
        });
        expect(getGroupsFromFile('2\n3\n4\n0')).toEqual({
            0: [2, 3, 4],
        });
        expect(
            getGroupsFromFile(`2
        3
        4

        5
        6
        `),
        ).toEqual({
            0: [2, 3, 4],
            1: [5, 6],
        });
    });
});
