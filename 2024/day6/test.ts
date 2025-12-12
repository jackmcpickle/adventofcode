// Utility Types
interface Position {
    x: number;
    y: number;
}

// Directions for the guard
const DIRECTIONS = [
    { x: 0, y: -1 }, // Up
    { x: 1, y: 0 }, // Right
    { x: 0, y: 1 }, // Down
    { x: -1, y: 0 }, // Left
];

// Parse input into a map and initial guard state
function parseInput(input: string[]): {
    map: string[][];
    start: Position;
    direction: number;
} {
    const map = input.map(line => line.split(''));
    let start: Position = { x: 0, y: 0 };
    let direction = 0;

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (['^', '>', 'v', '<'].includes(map[y][x])) {
                start = { x, y };
                direction = ['^', '>', 'v', '<'].indexOf(map[y][x]);
                map[y][x] = '.'; // Replace guard's position with empty space
            }
        }
    }

    return { map, start, direction };
}

// Simulate the guard's movement
function simulatePatrol(
    map: string[][],
    start: Position,
    direction: number,
): Set<string> {
    const visited = new Set<string>();
    let pos = { ...start };
    let dir = direction;

    while (
        pos.y >= 0 &&
        pos.y < map.length &&
        pos.x >= 0 &&
        pos.x < map[0].length
    ) {
        visited.add(`${pos.x},${pos.y}`);
        const nextPos = {
            x: pos.x + DIRECTIONS[dir].x,
            y: pos.y + DIRECTIONS[dir].y,
        };

        if (
            nextPos.y < 0 ||
            nextPos.y >= map.length ||
            nextPos.x < 0 ||
            nextPos.x >= map[0].length ||
            map[nextPos.y][nextPos.x] === '#'
        ) {
            dir = (dir + 1) % 4; // Turn right
        } else {
            pos = nextPos; // Move forward
        }
    }

    return visited;
}

// Find potential obstruction placements
function findLoopObstructions(
    map: string[][],
    start: Position,
    direction: number,
): Set<string> {
    const obstructions = new Set<string>();

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] !== '.') continue; // Only consider empty spaces

            // Clone the map and add an obstruction
            const newMap = map.map(row => [...row]);
            newMap[y][x] = '#';

            const visited = new Set<string>();
            const visitedOrder = new Map<string, number>();
            let pos = { ...start };
            let dir = direction;
            let steps = 0;
            let isLooping = false;

            while (
                pos.y >= 0 &&
                pos.y < newMap.length &&
                pos.x >= 0 &&
                pos.x < newMap[0].length
            ) {
                const key = `${pos.x},${pos.y}`;

                if (visitedOrder.has(key)) {
                    const loopStart = visitedOrder.get(key)!;
                    if (steps - loopStart > 0) {
                        isLooping = true;
                    }
                    break;
                }

                visited.add(key);
                visitedOrder.set(key, steps++);

                const nextPos = {
                    x: pos.x + DIRECTIONS[dir].x,
                    y: pos.y + DIRECTIONS[dir].y,
                };

                if (
                    nextPos.y < 0 ||
                    nextPos.y >= newMap.length ||
                    nextPos.x < 0 ||
                    nextPos.x >= newMap[0].length ||
                    newMap[nextPos.y][nextPos.x] === '#'
                ) {
                    dir = (dir + 1) % 4; // Turn right
                } else {
                    pos = nextPos; // Move forward
                }
            }

            if (isLooping) {
                obstructions.add(`${x},${y}`);
            }
        }
    }

    return obstructions;
}

// Test Cases
export function runTests(input: string[]) {
    const { map, start, direction } = parseInput(input);

    // // Part 1
    // const visited = simulatePatrol(map, start, direction);
    // console.log('Part 1:', visited.size); // Expect 41

    // Part 2
    const obstructions = findLoopObstructions(map, start, direction);
    return obstructions.size;
}
