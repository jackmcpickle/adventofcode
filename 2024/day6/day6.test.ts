import { describe, expect, it } from 'vitest';
import { getGrid, renderGrid } from './lib';

export const grid = [
    '....#.....',
    '.........#',
    '..........',
    '..#.......',
    '.......#..',
    '..........',
    '.#..^.....',
    '........#.',
    '#.........',
    '......#...',
];

describe('Day 6', () => {
    it('count of covers squares in grid.', () => {
        const outCoordinates = getGrid(grid);
        const output = renderGrid(grid, outCoordinates);
        console.log(output);
        console.log(outCoordinates);
        expect(outCoordinates.size).toEqual(41);
    });
    it('count of position to add obstruction squares in grid.', () => {
        const outCoordinates = getGrid(grid);
        const output = renderGrid(grid, outCoordinates);
        console.log(output);
        const crossOvers = Array.from(outCoordinates.entries()).filter(
            ([key, value]) => {
                return value.crossOver;
            },
        );

        console.log(crossOvers);

        expect(crossOvers.length).toEqual(6);
    });
});