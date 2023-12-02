import { describe, expect, test } from 'vitest';
import { GameSets } from './types';
import {
    findMinimumSet,
    findTotalMatchingGameIds,
    getTotalGamesPower,
    isPossibleGame,
    parseGame,
    parseGameSet,
    parseGameSets,
} from './utils';

const possibleGames = {
    red: 12,
    green: 13,
    blue: 14,
} satisfies GameSets;

const INPUT = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

describe('DAY 2', () => {
    test('Part 1', () => {
        expect(findTotalMatchingGameIds(INPUT, possibleGames)).toBe(8);
    });
    test('Part 2', () => {
        expect(getTotalGamesPower(INPUT)).toBe(2286);
    });

    test('parseGame', () => {
        expect(
            parseGame(`Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`),
        ).toStrictEqual({
            id: 5,
            sets: [
                { red: 6, blue: 1, green: 3 },
                { red: 1, blue: 2, green: 2 },
            ],
        });
        expect(
            parseGame(
                `Game 9: 4 green, 14 blue, 8 red; 17 blue, 3 red, 5 green; 2 green, 4 red, 6 blue; 7 red, 2 green, 18 blue; 3 red, 19 blue, 4 green; 4 green, 8 red, 6 blue`,
            ),
        ).toStrictEqual({
            id: 9,
            sets: [
                { red: 8, blue: 14, green: 4 },
                { red: 3, blue: 17, green: 5 },
                { red: 4, blue: 6, green: 2 },
                { red: 7, blue: 18, green: 2 },
                { red: 3, blue: 19, green: 4 },
                { red: 8, blue: 6, green: 4 },
            ],
        });
    });
    test('parseGameSet', () => {
        expect(parseGameSet('Game 5: 6 red, 1 blue, 3 green')).toStrictEqual({
            red: 6,
            blue: 1,
            green: 3,
        });
        expect(parseGameSet('2 blue, 1 red, 2 green')).toStrictEqual({
            red: 1,
            blue: 2,
            green: 2,
        });
    });
    test('parseGameSets', () => {
        expect(
            parseGameSets(
                'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
            ),
        ).toStrictEqual([
            { red: 6, blue: 1, green: 3 },
            { red: 1, blue: 2, green: 2 },
        ]);
    });
    test('isPossibleGame', () => {
        expect(
            isPossibleGame(
                [
                    { red: 6, blue: 1, green: 3 },
                    { red: 1, blue: 2, green: 2 },
                ],
                possibleGames,
            ),
        ).toBe(true);
        expect(
            isPossibleGame(
                [
                    { red: 6, blue: 1, green: 3 },
                    { red: 1, blue: 20, green: 2 },
                ],
                possibleGames,
            ),
        ).toBe(false);
    });

    test('findMinimumSet', () => {
        expect(
            findMinimumSet([
                { red: 8, blue: 14, green: 4 },
                { red: 3, blue: 17, green: 5 },
                { red: 4, blue: 6, green: 2 },
                { red: 7, blue: 18, green: 2 },
                { red: 3, blue: 19, green: 4 },
                { red: 8, blue: 6, green: 4 },
            ]),
        ).toStrictEqual({ red: 8, blue: 19, green: 5 });
    });
});
