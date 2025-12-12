import { describe, expect, it } from 'vitest';
import { getMASMASCount, getXMASCount } from './lib';

describe('Day4', () => {
    it('should vertically find XMAS in the array of strings', () => {
        const input = ['MMMSXXMASM', 'MSAMXMSMSA', 'AMXSXAAAMM', 'MSAMASMSMX'];

        const verticalSearchForXMAS = input.reduce(
            (acc, line, index, inputs) => {
                const atLimit = index + 4 > inputs.length;
                if (atLimit) {
                    console.log('At limit');
                    return acc;
                }
                const match = line.split('').filter((char, lineIndex) => {
                    return (
                        char === 'X' &&
                        inputs[index + 1][lineIndex] === 'M' &&
                        inputs[index + 2][lineIndex] === 'A' &&
                        inputs[index + 3][lineIndex] === 'S'
                    );
                });
                return acc + match.length;
            },
            0,
        );
        expect(verticalSearchForXMAS).toBe(1);
    });

    it('should diagonally find XMAS in the array of strings', () => {
        const input = [
            // prettier-ignore
            'MMMSXXMASM',
            'MSAMXMSMSA',
            'AMXSXAAAMM',
            'MSAMASMSMX',
        ];

        const diagonalSearchForXMAS = input.reduce(
            (acc, line, index, inputs) => {
                const atLimit = index + 4 > inputs.length;
                if (atLimit) {
                    console.log('At limit');
                    return acc;
                }

                const match = line
                    .split('')
                    .filter((char, charIndex, charLine) => {
                        const limit = charIndex + 4 > charLine.length;
                        return (
                            !limit &&
                            char === 'X' &&
                            inputs[index + 1][charIndex + 1] === 'M' &&
                            inputs[index + 2][charIndex + 2] === 'A' &&
                            inputs[index + 3][charIndex + 3] === 'S'
                        );
                    });

                return acc + match.length;
            },
            0,
        );
        expect(diagonalSearchForXMAS).toBe(1);
    });

    it('should backwards find XMAS in the array of strings', () => {
        const input = [
            // prettier-ignore
            'MMMSXXMASM',
            'MSAMXMSMSA',
            'AMXSXAAAMM',
            'MSAMASMSMX',
        ];

        const reversedInput = input.map(line =>
            line.split('').reverse().join(''),
        );

        const backwardsSearchForXMAS = reversedInput.reduce(
            (acc, line, index, inputs) => {
                const regexXMAS = /(XMAS)/g;
                const matches = line.matchAll(regexXMAS);
                const xmasMatches = Array.from(matches, m => m[0]);
                return acc + xmasMatches.length;
            },
            0,
        );
        expect(backwardsSearchForXMAS).toBe(1);
    });

    it('should find ALL XMAS in the array of strings', () => {
        const input = [
            // prettier-ignore
            'MMMSXXMASM',
            'MSAMXMSMSA',
            'AMXSXMAAMM',
            'MSAMASMSMX',
            'XMASAMXAMM',
            'XXAMMXXAMA',
            'SMSMSASXSS',
            'SAXAMASAAA',
            'MAMMMXMMMM',
            'MXMXAXMASX',
        ];

        const total = getXMASCount(input);
        expect(total).toBe(18);
    });

    it('should find ALL MASMAS in the array of strings', () => {
        const input = [
            // prettier-ignore
            'MMMSXXMASM',
            'MSAMXMSMSA',
            'AMXSXMAAMM',
            'MSAMASMSMX',
            'XMASAMXAMM',
            'XXAMMXXAMA',
            'SMSMSASXSS',
            'SAXAMASAAA',
            'MAMMMXMMMM',
            'MXMXAXMASX',
        ];

        const total = getMASMASCount(input);
        expect(total).toBe(9);
    });
});
