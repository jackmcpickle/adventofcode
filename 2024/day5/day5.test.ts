import { describe, expect, test } from 'vitest';

const rules = [
    [47, 53],
    [97, 13],
    [97, 61],
    [97, 47],
    [75, 29],
    [61, 13],
    [75, 53],
    [29, 13],
    [97, 29],
    [53, 29],
    [61, 53],
    [97, 53],
    [61, 29],
    [47, 13],
    [75, 47],
    [97, 75],
    [47, 61],
    [75, 61],
    [47, 29],
    [75, 13],
    [53, 13],
] as [number, number][];

const pageRows = [
    [75, 47, 61, 53, 29],
    [97, 61, 53, 29, 13],
    [75, 29, 13],
    [75, 97, 47, 61, 53],
    [61, 13, 29],
    [97, 13, 75, 29, 47],
] as number[][];

describe('DAY 5', () => {
    test('correctRows middlePage sum', () => {
        const correctRows = pageRows.filter((row, rowIndex, rows) => {
            return row.every((page, pageIndex) => {
                const matchingRules = rules.filter((row) => row[0] === page);
                // console.log({ page, pageIndex, matchingRules });
                return matchingRules.every(([min, max]) => {
                    // console.log({ maxIndex: row.indexOf(max) });
                    return (
                        row.indexOf(max) === -1 || pageIndex < row.indexOf(max)
                    );
                });
            });
        });

        // console.log({ correctRows });

        const middlePageSize = correctRows.reduce(
            (acc, row, rowIndex, rows) => {
                const middlePage = row[Math.round((row.length - 1) / 2)];
                // console.log({ middlepage: middlePage });
                return acc + middlePage;
            },
            0,
        );

        expect(middlePageSize).toBe(143);
    });

    test('IncorrectRows middlePage sum', () => {
        const inputCorrectRows = pageRows.filter((row, rowIndex, rows) => {
            return row.some((page, pageIndex) => {
                const matchingRules = rules.filter((row) => row[0] === page);

                return matchingRules.some(([_, comparePage]) => {
                    const match =
                        row.indexOf(comparePage) !== -1 &&
                        pageIndex > row.indexOf(comparePage);
                    return match;
                });
            });
        });

        const correctedRows = inputCorrectRows.map((row) => {
            const newRow = row.toSorted((pageA, pageB) => {
                const matchedRule = rules.find((row) => row[0] === pageA && row[1] === pageB);
                if (!matchedRule) {
                    return 0;
                }
                const [min, max] = matchedRule;
                return row.indexOf(max) - row.indexOf(min);
            });
            console.log(newRow);
            return newRow;
        });

        // console.log({ correctedRows });

        const middlePageSize = correctedRows.reduce(
            (acc, row) => {
                const middlePage = row[Math.round((row.length - 1) / 2)];
                console.log({ middlepage: middlePage });
                return acc + middlePage;
            },
            0,
        );

        expect(middlePageSize).toBe(123);
    });
});
