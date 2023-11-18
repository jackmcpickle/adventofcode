import { Rucksack, Compartment, SingleCompartment } from './types';

export function getCompartmentFromRackSack(line: string): Rucksack {
    const compartmentSize = line.length / 2;
    const compartments1 = line.slice(0, compartmentSize).split('');
    const compartments2 = line.slice(compartmentSize).split('');
    return [compartments1, compartments2];
}

export function getAllRuckSackItems(line: string): SingleCompartment {
    const compartments = getCompartmentFromRackSack(line);
    return [...compartments[0], ...compartments[1]];
}

export function findMatchingItem(sack: Rucksack): string | undefined {
    return sack[0].find((item) => sack[1].includes(item));
}

export function getCharPriority(char: keyof typeof CHAR_PRIORITY): number {
    return CHAR_PRIORITY[char];
}

export function findDuplicatesItemPriority(line: string): number {
    const compartments = getCompartmentFromRackSack(line);
    const item = findMatchingItem(compartments);
    if (!item) {
        return 0;
    }
    return getCharPriority(item);
}

export function searchGroupForDuplicates([
    rucksack1,
    rucksack2,
    rucksack3,
]: SingleCompartment[]): number {
    const char = rucksack1.find(
        (item1) => rucksack2.includes(item1) && rucksack3.includes(item1),
    );
    if (!char) {
        return 0;
    }
    return getCharPriority(char);
}

export function groupByThrees(lines: string): SingleCompartment[][] {
    const n = 3;
    const rackSacks = lines.split('\n');
    return rackSacks.reduce((group, sack, index) => {
        const compartments = getAllRuckSackItems(sack);
        if (index % n) {
            group[group.length - 1].push(compartments);
        } else {
            group.push([compartments]);
        }
        return group;
    }, [] as SingleCompartment[][]);
}

export function sumTotalListOfSacks(input: string): number {
    return input.split('\n').reduce((acc, line) => {
        return acc + findDuplicatesItemPriority(line);
    }, 0);
}

export function sumTotalDuplicatesGroups(input: string): number {
    const groups = groupByThrees(input);
    return groups.reduce((acc, group) => {
        return acc + searchGroupForDuplicates(group);
    }, 0);
}

const CHAR_PRIORITY: Record<string, number> = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
    A: 27,
    B: 28,
    C: 29,
    D: 30,
    E: 31,
    F: 32,
    G: 33,
    H: 34,
    I: 35,
    J: 36,
    K: 37,
    L: 38,
    M: 39,
    N: 40,
    O: 41,
    P: 42,
    Q: 43,
    R: 44,
    S: 45,
    T: 46,
    U: 47,
    V: 48,
    W: 49,
    X: 50,
    Y: 51,
    Z: 52,
};
