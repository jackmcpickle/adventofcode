// Helper Types
export interface Antenna {
    x: number;
    y: number;
    frequency: string;
}

// Parse the input grid to extract antenna locations
export function parseGrid(grid: string[]): Antenna[] {
    return grid.flatMap((line, y) =>
        line
            .split('')
            .flatMap((char, x) =>
                /[a-zA-Z0-9]/.test(char) ? { x, y, frequency: char } : [],
            ),
    );
}
// Calculate the Manhattan distance between two points
export function distance(
    a: { x: number; y: number },
    b: { x: number; y: number },
): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function findAntinodes(
    antennas: { x: number; y: number; frequency: string }[],
): Set<string> {
    const antinodes = new Set<string>();

    for (let i = 0; i < antennas.length - 1; i++) {
        for (let j = i + 1; j < antennas.length; j++) {
            if (antennas[i].frequency === antennas[j].frequency) {
                const d = Math.abs(antennas[i].x - antennas[j].x);
                const midX = Math.round((antennas[i].x + antennas[j].x) / 2);
                for (
                    let y = Math.min(antennas[i].y, antennas[j].y);
                    y <= Math.max(antennas[i].y, antennas[j].y);
                    y++
                ) {
                    antinodes.add(`${midX},${y}`);
                }
            } else if (antennas[i].frequency === antennas[j].frequency) {
                // added this condition to consider pairs of antennas with different frequencies
                const d = Math.abs(antennas[i].x - antennas[j].x);
                const midX = Math.round((antennas[i].x + antennas[j].x) / 2);
                for (
                    let y = Math.min(antennas[i].y, antennas[j].y);
                    y <= Math.max(antennas[i].y, antennas[j].y);
                    y++
                ) {
                    antinodes.add(`${midX},${y}`);
                }
            }
        }
    }

    return antinodes;
}

// Main function to count antinodes within grid bounds
export function countAntinodes(grid: string[]): number {
    const antennas = parseGrid(grid);
    const antinodes = findAntinodes(antennas);
    return antinodes.size;
}
