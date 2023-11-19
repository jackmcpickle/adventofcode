import { describe, expect, test } from 'vitest';
import { getMatchingPattern, noMatchInGroup } from './utils';

describe('DAY 6', () => {
    test('noMatchInGroup', () => {
        expect(noMatchInGroup([1, 2, 3, 4])).toBe(true);
        expect(noMatchInGroup([1, 2, 3, 1])).toBe(false);
        expect(noMatchInGroup(['a', 'b', 'c', 'd'])).toBe(true);
        expect(noMatchInGroup(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])).toBe(
            true,
        );
        expect(noMatchInGroup(['a', 1, 'c', 'b', 'd', 1])).toBe(false);
    });
    test('getMatchingPattern - 4', () => {
        expect(getMatchingPattern('bvwbjplbgvbhsrlpgdmjqwftvncz', 4)).toBe(5);
        expect(getMatchingPattern('nppdvjthqldpwncqszvftbrmjlhg', 4)).toBe(6);
        expect(getMatchingPattern('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4)).toBe(
            10,
        );
        expect(getMatchingPattern('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4)).toBe(
            11,
        );
    });
    test('getMatchingPattern - 14', () => {
        expect(getMatchingPattern('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)).toBe(
            19,
        );
        expect(getMatchingPattern('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)).toBe(23);
        expect(getMatchingPattern('nppdvjthqldpwncqszvftbrmjlhg', 14)).toBe(23);
        expect(
            getMatchingPattern('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14),
        ).toBe(29);
        expect(getMatchingPattern('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)).toBe(
            26,
        );
    });
});
