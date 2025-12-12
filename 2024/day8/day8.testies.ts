import { describe, expect, test } from 'vitest';
import {
    type Antenna,
    countAntinodes,
    distance,
    findAntinodes,
    parseGrid,
} from './lib';

const grid = [
    '............',
    '........0...',
    '.....0......',
    '.......0....',
    '....0.......',
    '......A.....',
    '............',
    '............',
    '........A...',
    '.........A..',
    '............',
    '............',
];

describe('parseGrid', () => {
    test('parses a grid with multiple antennas', () => {
        const expected = [
            { x: 0, y: 0, frequency: '.' },
            { x: 5, y: 0, frequency: '1' },
            { x: 8, y: 0, frequency: '.' },
            { x: 2, y: 1, frequency: '2' },
            { x: 4, y: 1, frequency: '3' },
            { x: 6, y: 1, frequency: '.' },
            { x: 1, y: 2, frequency: '4' },
        ];
        expect(parseGrid(grid)).toEqual(expected);
    });
});

describe('findAntinodes', () => {
    test('finds antinodes for a given frequency', () => {
        const antennas = [
            { x: 0, y: 0, frequency: 'A' },
            { x: 5, y: 0, frequency: 'A' },
            { x: 2, y: 1, frequency: 'B' },
            { x: 4, y: 1, frequency: 'B' },
        ];
        const expected = new Set(['3,0', '-1,0', '3,1', '-1,1']);
        expect(findAntinodes(antennas)).toEqual(expected);
    });
});

describe('countAntinodes', () => {
    test('counts the number of antinodes within grid bounds', () => {
        expect(countAntinodes(grid)).toBe(14);
    });
});
