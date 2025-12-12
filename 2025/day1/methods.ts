import { dir, log } from "node:console";

type Direction = 'L' | 'R';

type Move = [Direction, string];

export function createData(input: string) {
    return input
        .split("\n")
        .map((line) => [line[0] as Direction, line.slice(1)] as Move);
}

export async function part1(data: Move[]) {
    let password = 0;
    let position = 50;
    for (const [direction, stepsStr] of data) {
        const steps = Number(stepsStr);
        position = moveDial(position, steps, direction);
        console.log(
            `Moved ${steps} steps to the ${direction}, new position: ${position}`
        );
        if (position === 0) {
            password++;
        }
    }
    return password;
}

export function moveDial(startPosition: number, steps: number, direction: string) {
    let currentPosition = startPosition;
    if (direction === 'R') {
        currentPosition = currentPosition + steps
    } else if (direction === 'L') {
        currentPosition = currentPosition - steps
    }
    // Wrap around the dial (0-99)
    const rotations = Math.ceil(Math.abs(currentPosition) / 100);
    const counter = 100 * rotations;
    if (currentPosition < 0) {
        currentPosition += counter;
    } else if (currentPosition >= 100) {
        currentPosition -= counter;
    }
    return currentPosition;
}


export async function part2(data: Move[]) {
    let password = 0;
    let position = 50;
    for (const [direction, stepsStr] of data) {
        const steps = Number(stepsStr);
        [position, password] = moveDialWithPassword(position, password, steps, direction);
        console.log(
            `Moved ${steps} steps to the ${direction}, new position: ${position}. With password: ${password}`
        );
    }
    return password;
}


export function moveDialWithPassword(
    startPosition: number,
    password: number,
    steps: number,
    direction: string
): [number, number] {
    console.log(`Starting ${startPosition}, direction: ${direction}`);
    let currentPosition = startPosition;

    for (let i = 0; i < steps; i++) {
        if (direction === "R") {
            currentPosition++;
        } else if (direction === "L") {
            currentPosition--;
        }
        if(currentPosition > 99) {
            currentPosition = 0;
        }
        if (currentPosition < 0) {
            currentPosition = 99;
        }
        if (currentPosition === 0) {
            password++;
        }
    }

    log(
        `Current Position: ${currentPosition}, Password: ${password}`
    );

    return [currentPosition, password];
}
