export const GUARD = '^';
export const BLOCK = '#';
export const EMPTY = '.';
export const PATH = 'X';

export const DIRECTION = {
    North: 'North',
    South: 'South',
    East: 'East',
    West: 'West',
} as const;

type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];

export type Coordinates<X = number, Y = number> = [X, Y];

export type Cell = {
    value: Coordinates;
    visited: boolean;
    crossOver: boolean;
};

export function getGrid(input: string[]): Map<string, Cell> {
    const coverage = new Map<string, Cell>();
    const startCoordinates = findStartCoordinates(input);
    addCoverage(coverage, startCoordinates, false);
    // console.log('Starting position', startCoordinates);
    const total = moveLoop(coverage, input, startCoordinates, DIRECTION.North);
    return total;
}

function moveLoop(
    coverage: Map<string, Cell>,
    grid: string[],
    startCoordinates: Coordinates,
    direction: Direction,
): Map<string, Cell> {
    const bounds = getGridBounds(grid);
    // console.log('start', startCoordinates, 'in', direction);
    const possibleMove = getDirectionMove(startCoordinates, direction);

    if (outOfBounds(possibleMove, bounds)) {
        // console.log('out of bounds');
        return coverage;
    }

    if (checkForCollisionWithBlock(grid, possibleMove)) {
        const newDirection = turnRight(direction);
        const newDirectionPosition = getDirectionMove(
            startCoordinates,
            newDirection,
        );
        addCoverage(coverage, newDirectionPosition);
        // console.log('turning right to:', newDirection);
        return moveLoop(coverage, grid, newDirectionPosition, newDirection);
    }
    // console.log('continue straight in ', direction);
    addCoverage(coverage, possibleMove);
    return moveLoop(coverage, grid, possibleMove, direction);
}

function checkForCollisionWithBlock(grid: string[], coordinates: Coordinates) {
    const [x, y] = coordinates;
    const row = grid[y];
    const char = row[x];
    const collision = char === BLOCK;
    // console.log('check on ', row, x, y, 'collision', collision);
    return collision;
}

function findStartCoordinates(grid: string[]): Coordinates {
    return grid.reduce(
        (acc, row, index) => {
            const rowGrid = row.split('');
            if (rowGrid.includes(GUARD)) {
                return [rowGrid.indexOf(GUARD), index] as Coordinates;
            }
            return acc;
        },
        [0, 0] as Coordinates,
    );
}

function getDirectionMove(
    move: Coordinates,
    direction: Direction,
): Coordinates {
    const [x, y] = move;
    switch (direction) {
        case DIRECTION.North:
            return [x, y - 1];
        case DIRECTION.South:
            return [x, y + 1];
        case DIRECTION.East:
            return [x + 1, y];
        case DIRECTION.West:
            return [x - 1, y];
    }
}

function getGridBounds(grid: string[]): Coordinates {
    return [grid.length, grid[0].length];
}

export function outOfBounds(coordinates: Coordinates, bounds: Coordinates) {
    return (
        coordinates[0] < 0 ||
        coordinates[0] >= bounds[0] ||
        coordinates[1] < 0 ||
        coordinates[1] >= bounds[1]
    );
}

export function turnRight(direction: Direction): Direction {
    switch (direction) {
        case DIRECTION.North:
            return DIRECTION.East;
        case DIRECTION.East:
            return DIRECTION.South;
        case DIRECTION.South:
            return DIRECTION.West;
        case DIRECTION.West:
            return DIRECTION.North;
    }
}

export function renderGrid(grid: string[], path: Map<string, Cell>) {
    return grid.reduce((acc, row, rowIndex) => {
        const rowString = row.split('').reduce((acc, char, colIndex) => {
            const matchingPath = checkCoverage(path, [colIndex, rowIndex]);
            if (matchingPath) {
                return acc + PATH;
            }
            return acc + char;
        }, '');
        return acc + rowString + '\n';
    }, '');
}

function checkCoverage(coverage: Map<string, Cell>, coordinates: Coordinates) {
    const [x, y] = coordinates;
    const key = `${x}${y}`;
    return coverage.has(key);
}

function addCoverage(
    coverage: Map<string, Cell>,
    coordinates: Coordinates,
    visited = true,
): void {
    const [x, y] = coordinates;
    const key = `${x}${y}`;
    if (coverage.has(key)) {
        const cell = coverage.get(key)!;
        coverage.set(key, {
            value: [x, y],
            visited: visited,
            crossOver: cell?.visited,
        });
        return;
    }
    coverage.set(key, {
        value: [x, y],
        visited: visited,
        crossOver: false,
    });
}


// 5289
// 5329
