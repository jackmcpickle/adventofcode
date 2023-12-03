type Cell = {
    rowIndex: number;
    colIndex: number;
    char: string;
};

const NUMBER_SEARCH = /([0-9]+)/g;
const GEAR_SEARCH = /([*])/g;
const CHAR_SEARCH = /([^\s\d\.])/g;

export function createRows(input: string, search: RegExp): Cell[] {
    return input.split('\n').reduce((cells, line, rowIndex) => {
        const matches = line.matchAll(search);
        const matchingCells = [];
        for (const match of matches) {
            matchingCells.push({
                rowIndex: rowIndex,
                colIndex: match.index!,
                char: match[0],
            });
        }
        return [...cells, ...matchingCells];
    }, [] as Cell[]);
}

export function createGearRows(input: string): Cell[] {
    return createRows(input, GEAR_SEARCH);
}

export function createNumberRows(input: string): Cell[] {
    return createRows(input, NUMBER_SEARCH);
}

export function createSpecialCharRows(input: string): Cell[] {
    return createRows(input, CHAR_SEARCH);
}

export function searchClosestSymbol(searchCells: Cell[], findCells: Cell[]) {
    return findCells.filter((cell) =>
        searchCells.some((searchCell) => hasAdjacentMatch(searchCell, cell)),
    );
}

function hasAdjacentMatch(symbolCell: Cell, findCell: Cell): boolean {
    const [findXMin, findXMax] = [
        findCell.colIndex - 1, // one behind
        findCell.colIndex + findCell.char.length,
    ];

    const [findYMin, findYMax] = [findCell.rowIndex - 1, findCell.rowIndex + 1];

    return (
        symbolCell.colIndex >= findXMin &&
        symbolCell.colIndex <= findXMax &&
        symbolCell.rowIndex >= findYMin &&
        symbolCell.rowIndex <= findYMax
    );
}

export function getAllPossibleMatches(input: string): Cell[] {
    const search = createSpecialCharRows(input);
    const numbers = createNumberRows(input);
    const matches = searchClosestSymbol(search, numbers);
    return matches;
}

export function sumOfAllPossibleMatches(input: string): number {
    const matching = getAllPossibleMatches(input);
    return matching.reduce(sumCol, 0);
}

export function findGears(gearCells: Cell[], ratioCells: Cell[]) {
    return gearCells.map((cell) => {
        const cells = ratioCells.filter((rCell) =>
            hasAdjacentMatch(cell, rCell),
        );
        if (cells.length === 2) {
            return cells.reduce(timesCol, 1);
        }
        return 0;
    });
}

export function sumAllGearRatios(input: string): number {
    const search = createNumberRows(input);
    const gears = createGearRows(input);
    const match = findGears(gears, search);
    return match.reduce((sum, item) => sum + item, 0);
}

export function sumCol(sum: number, cell: Cell) {
    return sum + Number(cell.char);
}

export function timesCol(sum: number, cell: Cell) {
    return sum * Number(cell.char);
}
