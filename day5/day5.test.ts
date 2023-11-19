import { describe, expect, test } from 'vitest';
import {
    getEncasedChat,
    getEnd,
    getStart,
    getTopMultiStackItems,
    getTopSingleStackItems,
    makeInstructionSet,
    makeInstructionSets,
    makeIterator,
    makeStack,
} from './utils';

describe('DAY 5', () => {
    test('check top 4 crates', () => {
        const input = `[D] [N] [C] [A]
[Z] [M] [P] [B]
 1   2   3   4 `;
        const stacks = makeStack(input);
        expect(stacks[0].peek()).toBe('D');
        expect(stacks[1].peek()).toBe('N');
        expect(stacks[2].peek()).toBe('C');
        expect(stacks[3].peek()).toBe('A');
    });
    test('check top 1 crates', () => {
        const input = `[D]
[Z]
 1 `;
        const stacks = makeStack(input);
        expect(stacks[0].peek()).toBe('D');
    });

    test('getTopStackItems', () => {
        const stacks = '    [D]    \n[N] [C]    \n[Z] [M] [P]\n 1   2   3 ';
        const instructions = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
        expect(getTopSingleStackItems(instructions, stacks)).toBe('CMZ');
    });

    test('getTopMultiStackItems', () => {
        const stacks = '    [D]    \n[N] [C]    \n[Z] [M] [P]\n 1   2   3 ';
        const instructions2 = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
        expect(getTopMultiStackItems(instructions2, stacks)).toBe('MCD');
    });

    test('makeInstructionSets', () => {
        expect(
            makeInstructionSets(`move 3 from 1 to 3
move 2 from 2 to 1`),
        ).toStrictEqual([
            {
                move: 3,
                from: 1,
                to: 3,
            },
            {
                move: 2,
                from: 2,
                to: 1,
            },
        ]);
    });

    test('makeInstructionSet', () => {
        expect(makeInstructionSet('move 3 from 5 to 7')).toStrictEqual({
            move: 3,
            from: 5,
            to: 7,
        });
        expect(makeInstructionSet('move 10 from 52 to 700')).toStrictEqual({
            move: 10,
            from: 52,
            to: 700,
        });
        expect(makeInstructionSet('move 1 from -2 to -7')).toStrictEqual({
            move: 1,
            from: -2,
            to: -7,
        });
    });

    test('makeIterator', () => {
        expect(makeIterator(3)).toStrictEqual([0, 1, 2]);
        expect(makeIterator(0)).toStrictEqual([]);
        expect(makeIterator(5)).toStrictEqual([0, 1, 2, 3, 4]);
    });

    test('getStart', () => {
        expect(getStart(0, 2, 1)).toBe(0);
        expect(getStart(0, 99, 12)).toBe(0);
        expect(getStart(4, 2, 12)).toBe(56);
        expect(getStart(3, 2, 1)).toBe(9);
    });

    test('getEnd', () => {
        expect(getEnd(0, 2, 1)).toBe(2);
        expect(getEnd(0, 99, 12)).toBe(99);
        expect(getEnd(4, 2, 12)).toBe(58);
        expect(getEnd(3, 2, 1)).toBe(11);
    });

    test('getEncasedChat', () => {
        expect(getEncasedChat('[10]')).toBe('10');
        expect(getEncasedChat('[A]')).toBe('A');
        expect(getEncasedChat('[abC]')).toBe('abC');
    });
});
