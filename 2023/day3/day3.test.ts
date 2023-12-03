import { describe, expect, test } from 'vitest';
import {
    createGearRows,
    createNumberRows,
    createSpecialCharRows,
    getAllPossibleMatches,
    sumAllGearRatios,
    sumOfAllPossibleMatches,
} from './utils';

const INPUT = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

describe('Day 3', () => {
    test('part 1', () => {
        expect(sumOfAllPossibleMatches(INPUT)).toBe(4361);
    });
    test('part 2', () => {
        expect(sumAllGearRatios(INPUT)).toBe(467835);
    });
    test('getAllPossibleMatches', () => {
        expect(getAllPossibleMatches(INPUT)).toStrictEqual([
            {
                colIndex: 0,
                char: '467',
                rowIndex: 0,
            },
            {
                colIndex: 2,
                char: '35',
                rowIndex: 2,
            },
            {
                colIndex: 6,
                char: '633',
                rowIndex: 2,
            },
            {
                colIndex: 0,
                char: '617',
                rowIndex: 4,
            },
            {
                colIndex: 2,
                char: '592',
                rowIndex: 6,
            },
            {
                colIndex: 6,
                char: '755',
                rowIndex: 7,
            },
            {
                colIndex: 1,
                char: '664',
                rowIndex: 9,
            },
            {
                colIndex: 5,
                char: '598',
                rowIndex: 9,
            },
        ]);
    });
    test('createSpecialCharRows', () => {
        expect(createSpecialCharRows(INPUT)).toStrictEqual([
            {
                char: '*',
                colIndex: 3,
                rowIndex: 1,
            },
            {
                char: '#',
                colIndex: 6,
                rowIndex: 3,
            },
            {
                char: '*',
                colIndex: 3,
                rowIndex: 4,
            },
            {
                char: '+',
                colIndex: 5,
                rowIndex: 5,
            },
            {
                char: '$',
                colIndex: 3,
                rowIndex: 8,
            },
            {
                char: '*',
                colIndex: 5,
                rowIndex: 8,
            },
        ]);
    });
    test('createNumberRows', () => {
        expect(createNumberRows(INPUT)).toStrictEqual([
            {
                colIndex: 0,
                char: '467',
                rowIndex: 0,
            },
            {
                colIndex: 5,
                char: '114',
                rowIndex: 0,
            },
            {
                colIndex: 2,
                char: '35',
                rowIndex: 2,
            },
            {
                colIndex: 6,
                char: '633',
                rowIndex: 2,
            },
            {
                colIndex: 0,
                char: '617',
                rowIndex: 4,
            },
            {
                colIndex: 7,
                char: '58',
                rowIndex: 5,
            },
            {
                colIndex: 2,
                char: '592',
                rowIndex: 6,
            },
            {
                colIndex: 6,
                char: '755',
                rowIndex: 7,
            },
            {
                colIndex: 1,
                char: '664',
                rowIndex: 9,
            },
            {
                colIndex: 5,
                char: '598',
                rowIndex: 9,
            },
        ]);
    });
    test('createGearRows', () => {
        expect(createGearRows(INPUT)).toStrictEqual([
            {
                char: '*',
                colIndex: 3,
                rowIndex: 1,
            },
            {
                char: '*',
                colIndex: 3,
                rowIndex: 4,
            },
            {
                char: '*',
                colIndex: 5,
                rowIndex: 8,
            },
        ]);
    });
});
