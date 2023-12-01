import { describe, expect, test } from 'vitest';
import {
    convertToRawCalibrationInput,
    findLargestBundle,
    findLargestWithWordsBundle,
    mapDigitWord,
    reduceCalibrationInput,
    takeCalibrationInput,
} from './utils';

const INPUT = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const INPUT_WORD = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

describe('DAY 1', () => {
    test('Part 1', () => {
        expect(findLargestBundle(INPUT)).toBe(142);
    });
    test('Part 2', () => {
        expect(findLargestWithWordsBundle(INPUT_WORD)).toBe(281);
    });

    test('convertToCalibrationInput', () => {
        expect(convertToRawCalibrationInput(INPUT)).toStrictEqual([
            [1, 2],
            [3, 8],
            [1, 2, 3, 4, 5],
            [7],
        ]);
    });

    test('takeCalibrationInput', () => {
        expect(
            takeCalibrationInput(convertToRawCalibrationInput(INPUT)),
        ).toStrictEqual([
            [1, 2],
            [3, 8],
            [1, 5],
            [7, 7],
        ]);
        expect(takeCalibrationInput([[1]])).toStrictEqual([[1, 1]]);
        expect(takeCalibrationInput([[2, 3, 4]])).toStrictEqual([[2, 4]]);
    });
    test('reduceCalibrationInput', () => {
        expect(
            reduceCalibrationInput([
                [1, 2],
                [3, 8],
                [1, 5],
                [7, 7],
            ]),
        ).toStrictEqual(142);
    });
    test('mapDigitWord', () => {
        expect(mapDigitWord('1')).toStrictEqual([1]);
        expect(mapDigitWord('two1')).toStrictEqual([2, 1]);
        expect(mapDigitWord('321')).toStrictEqual([3, 2, 1]);
        expect(mapDigitWord('4nineeightseven2')).toStrictEqual([4, 9, 8, 7, 2]);
        expect(mapDigitWord('7pqrstsixteen')).toStrictEqual([7, 6]);
        expect(mapDigitWord('eightwothree')).toStrictEqual([8, 2, 3]);
        expect(mapDigitWord('eightthree')).toStrictEqual([8, 3]);
        expect(
            mapDigitWord('nbxd75hrdqnmfive2onenlchjfoneightlh'),
        ).toStrictEqual([7, 5, 5, 2, 1, 1, 8]);
        expect(mapDigitWord('zoneight234')).toStrictEqual([1, 8, 2, 3, 4]);
        expect(
            mapDigitWord('qpzcfbfsrxthreenine3ksbghzzffsevenfive9'),
        ).toStrictEqual([3, 9, 3, 7, 5, 9]);
    });
});
