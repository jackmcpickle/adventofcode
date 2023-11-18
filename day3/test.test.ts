import { describe, expect, test } from 'vitest';
import {
    findDuplicatesItemPriority,
    findMatchingItem,
    getAllRuckSackItems,
    getCharPriority,
    getCompartmentFromRackSack,
    groupByThrees,
    searchGroupForDuplicates,
    sumTotalDuplicatesGroups,
    sumTotalListOfSacks,
} from './utils';

describe('Compartments Sort', () => {
    test('getAllRuckSackItems', () => {
        expect(getAllRuckSackItems(`abcd`)).toStrictEqual(['a', 'b', 'c', 'd']);
    });

    test('getCompartmentFromRackSack', () => {
        expect(
            getCompartmentFromRackSack('vJrwpWtwJgWrhcsFMMfFFhFp'),
        ).toStrictEqual([
            ['v', 'J', 'r', 'w', 'p', 'W', 't', 'w', 'J', 'g', 'W', 'r'],
            ['h', 'c', 's', 'F', 'M', 'M', 'f', 'F', 'F', 'h', 'F', 'p'],
        ]);
    });

    test('findMatchingItem', () => {
        expect(
            findMatchingItem([
                ['a', 'b', 'c'],
                ['d', 'e', 'f', 'a'],
            ]),
        ).toBe('a');
    });

    test('getCharPriority', () => {
        expect(getCharPriority('a')).toBe(1);
        expect(getCharPriority('z')).toBe(26);
        expect(getCharPriority('A')).toBe(27);
        expect(getCharPriority('Z')).toBe(52);
    });

    test('findDuplicatesItemPriority', () => {
        expect(findDuplicatesItemPriority('abZcdefghiZj')).toBe(52);
    });

    test('sumTotalListOfSacks', () => {
        expect(
            sumTotalListOfSacks(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`),
        ).toBe(157);
    });

    test('groupByThrees', () => {
        expect(
            groupByThrees(`asd
asd
asd`),
        ).toStrictEqual([
            [
                ['a', 's', 'd'],
                ['a', 's', 'd'],
                ['a', 's', 'd'],
            ],
        ]);
    });
    test('searchGroupForDuplicates', () => {
        expect(
            searchGroupForDuplicates([
                ['a', 'Z'],
                ['b', 'Z'],
                ['c', 'Z'],
            ]),
        ).toBe(52);
    });

    test('sumTotalDuplicatesGroups', () => {
        expect(
            sumTotalDuplicatesGroups(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`),
        ).toBe(70);
    });
});
