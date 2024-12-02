import { describe, expect, test } from 'vitest';
import {
    findLocationFromSearchId,
    findLocationFromSearchIdRange,
    lowestLocationNumber,
    parseAlmanacMaps,
} from './utils';

const SEEDS = `seeds: 79 14 55 13`;
const INPUT = `seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

describe('DAY 5', () => {
    test('findLocationFromSearchId 99', () => {
        const maps = parseAlmanacMaps(INPUT);
        expect(findLocationFromSearchId(99, maps, 'seed', 'soil')).toBe(51);
    });
    test('findLocationFromSearchId 79', () => {
        const maps = parseAlmanacMaps(INPUT);
        expect(findLocationFromSearchId(79, maps, 'seed', 'soil')).toBe(81);
        expect(findLocationFromSearchId(79, maps, 'seed', 'fertilizer')).toBe(
            81,
        );
        expect(findLocationFromSearchId(79, maps, 'seed', 'water')).toBe(81);
        expect(findLocationFromSearchId(79, maps, 'seed', 'light')).toBe(74);
        expect(findLocationFromSearchId(79, maps, 'seed', 'temperature')).toBe(
            78,
        );
        expect(findLocationFromSearchId(79, maps, 'seed', 'humidity')).toBe(78);
        expect(findLocationFromSearchId(79, maps, 'seed', 'location')).toBe(82);
    });
    test('findLocationFromSearchId 14', () => {
        const maps = parseAlmanacMaps(INPUT);
        expect(findLocationFromSearchId(14, maps, 'seed', 'soil')).toBe(14);
        expect(findLocationFromSearchId(14, maps, 'seed', 'soil')).toBe(14);
        expect(findLocationFromSearchId(14, maps, 'seed', 'fertilizer')).toBe(
            53,
        );
        expect(findLocationFromSearchId(14, maps, 'seed', 'water')).toBe(49);
        expect(findLocationFromSearchId(14, maps, 'seed', 'light')).toBe(42);
        expect(findLocationFromSearchId(14, maps, 'seed', 'temperature')).toBe(
            42,
        );
        expect(findLocationFromSearchId(14, maps, 'seed', 'humidity')).toBe(43);
        expect(findLocationFromSearchId(14, maps, 'seed', 'location')).toBe(43);
    });
    test('findLocationFromSearchId 55', () => {
        const maps = parseAlmanacMaps(INPUT);
        expect(findLocationFromSearchId(55, maps, 'seed', 'soil')).toBe(57);
        expect(findLocationFromSearchId(55, maps, 'seed', 'fertilizer')).toBe(
            57,
        );
        expect(findLocationFromSearchId(55, maps, 'seed', 'water')).toBe(53);
        expect(findLocationFromSearchId(55, maps, 'seed', 'light')).toBe(46);
        expect(findLocationFromSearchId(55, maps, 'seed', 'temperature')).toBe(
            82,
        );
        expect(findLocationFromSearchId(55, maps, 'seed', 'humidity')).toBe(82);
        expect(findLocationFromSearchId(55, maps, 'seed', 'location')).toBe(86);
    });

    test('findLocationFromSearchId 13', () => {
        const maps = parseAlmanacMaps(INPUT);
        expect(findLocationFromSearchId(13, maps, 'seed', 'soil')).toBe(13);
    });
    test('parseAlmanacMaps', () => {
        expect(parseAlmanacMaps(INPUT)).toStrictEqual([
            {
                ranges: [
                    {
                        size: 48,
                        destination: 52,
                        source: 50,
                    },
                    {
                        size: 2,
                        destination: 50,
                        source: 98,
                    },
                ],
                sourceName: 'seed',
                destinationName: 'soil',
            },
            {
                ranges: [
                    {
                        size: 15,
                        destination: 39,
                        source: 0,
                    },
                    {
                        size: 37,
                        destination: 0,
                        source: 15,
                    },
                    {
                        size: 2,
                        destination: 37,
                        source: 52,
                    },
                ],
                sourceName: 'soil',
                destinationName: 'fertilizer',
            },
            {
                ranges: [
                    {
                        size: 7,
                        destination: 42,
                        source: 0,
                    },
                    {
                        size: 4,
                        destination: 57,
                        source: 7,
                    },
                    {
                        size: 42,
                        destination: 0,
                        source: 11,
                    },
                    {
                        size: 8,
                        destination: 49,
                        source: 53,
                    },
                ],
                sourceName: 'fertilizer',
                destinationName: 'water',
            },
            {
                ranges: [
                    {
                        size: 7,
                        destination: 88,
                        source: 18,
                    },
                    {
                        size: 70,
                        destination: 18,
                        source: 25,
                    },
                ],
                sourceName: 'water',
                destinationName: 'light',
            },
            {
                ranges: [
                    {
                        size: 19,
                        destination: 81,
                        source: 45,
                    },
                    {
                        size: 13,
                        destination: 68,
                        source: 64,
                    },
                    {
                        size: 23,
                        destination: 45,
                        source: 77,
                    },
                ],
                sourceName: 'light',
                destinationName: 'temperature',
            },
            {
                ranges: [
                    {
                        size: 69,
                        destination: 1,
                        source: 0,
                    },
                    {
                        size: 1,
                        destination: 0,
                        source: 69,
                    },
                ],
                sourceName: 'temperature',
                destinationName: 'humidity',
            },
            {
                ranges: [
                    {
                        size: 37,
                        destination: 60,
                        source: 56,
                    },
                    {
                        size: 4,
                        destination: 56,
                        source: 93,
                    },
                ],
                sourceName: 'humidity',
                destinationName: 'location',
            },
        ]);
    });

    // test('findLocationFromSearchIdRange', () => {
    //     const maps = parseAlmanacMaps(INPUT);
    //     const [min, max] = [79, 79 + 14 - 1];
    //     expect(
    //         findLocationFromSearchIdRange(min, max, maps, 'seed', 'soil'),
    //     ).toBe(46);
    // });
});
