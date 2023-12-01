import { describe, expect, test } from 'vitest';
import {
    checkSectionGroupFullyOverlap,
    checkSectionGroupPartialOverlap,
    countAllFullyOverlappedGroups,
    countPartialOverlappedGroups,
    createSectionGroups,
} from './utils';

describe('day4', () => {
    test('fully contained sections', () => {
        const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
        expect(countAllFullyOverlappedGroups(input)).toBe(2);
    });
    test('partial contained sections', () => {
        const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
        expect(countPartialOverlappedGroups(input)).toBe(4);
    });
    test('createSectionGroups', () => {
        expect(createSectionGroups('2-4,6-8\n2-3,4-5')).toStrictEqual([
            [
                [2, 4],
                [6, 8],
            ],
            [
                [2, 3],
                [4, 5],
            ],
        ]);
    });
    test('checkSectionGroupFullyOverlap', () => {
        expect(
            checkSectionGroupFullyOverlap([
                [2, 4],
                [6, 8],
            ]),
        ).toBe(false);
        expect(
            checkSectionGroupFullyOverlap([
                [1, 5],
                [2, 4],
            ]),
        ).toBe(true);
        expect(
            checkSectionGroupFullyOverlap([
                [1, 5],
                [2, 6],
            ]),
        ).toBe(false);
    });

    test('check PartialOverlap - no overlap', () => {
        expect(
            checkSectionGroupPartialOverlap([
                [2, 4],
                [6, 8],
            ]),
        ).toBe(false);
        expect(
            checkSectionGroupPartialOverlap([
                [1, 5],
                [6, 6],
            ]),
        ).toBe(false);
        expect(
            checkSectionGroupPartialOverlap([
                [2, 2],
                [1, 1],
            ]),
        ).toBe(false);
    });
    test('check PartialOverlap - partial overlap', () => {
        expect(
            checkSectionGroupPartialOverlap([
                [1, 2],
                [2, 4],
            ]),
        ).toBe(true);
    });
    test('check PartialOverlap - fully overlap', () => {
        expect(
            checkSectionGroupPartialOverlap([
                [1, 5],
                [2, 4],
            ]),
        ).toBe(true);
    });
    test('check PartialOverlap - fully overlap inverse', () => {
        expect(
            checkSectionGroupPartialOverlap([
                [2, 3],
                [1, 4],
            ]),
        ).toBe(true);
    });
    test('check PartialOverlap - inverse some overlap', () => {
        expect(
            checkSectionGroupPartialOverlap([
                [2, 6],
                [1, 5],
            ]),
        ).toBe(true);
    });
    test('check PartialOverlap - inverse no overlap', () => {
        expect(
            checkSectionGroupPartialOverlap([
                [6, 8],
                [1, 2],
            ]),
        ).toBe(false);
    });
    test('check PartialOverlap - inverse no overlap again', () => {
        expect(
            checkSectionGroupPartialOverlap([
                [6, 7],
                [4, 5],
            ]),
        ).toBe(false);
    });
});
