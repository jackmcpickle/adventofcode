import { describe, expect, test} from "vitest";
import { createData, part1, part2 } from "./methods";

const testCase = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

describe("Day 1", () => {
    test("Part 1", async () => {
        const result = await part1(createData(testCase));
        expect(result).toBe(3);
    });
    test("Part 2", async () => {
        const result = await part2(createData(testCase));
        expect(result).toBe(6);
    });
});
