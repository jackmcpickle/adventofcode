import { describe, expect, test } from 'vitest';
import {
    getPaperOutcome,
    getRockOutcome,
    getScissorOutcome,
    handScoreFight,
    roundScoreFightHand,
    toFormat,
} from './utils';
import { HandValues, OutcomeType } from './types';
import { findCorrectStrategyScore, findYourTotalScore } from '.';

describe('ROCK PAPER scissor', () => {
    test('toFormat', () => {
        expect(
            toFormat(`A Y
B X
C Z`),
        ).toStrictEqual([
            ['A', 'Y'],
            ['B', 'X'],
            ['C', 'Z'],
        ]);
    });

    test('findCorrectStrategyScore', () => {
        expect(
            findCorrectStrategyScore(`A Y
B X
C Z`),
        ).toBe(12);
    });

    test('findYourTotalScore', () => {
        expect(
            findYourTotalScore(`A Y
B X
C Z`),
        ).toBe(15);
    });

    test('roundScoreFightHand', () => {
        expect(roundScoreFightHand(HandValues.SCISSORS, HandValues.ROCK)).toBe(
            6,
        );
        expect(roundScoreFightHand(HandValues.SCISSORS, HandValues.PAPER)).toBe(
            0,
        );
        expect(
            roundScoreFightHand(HandValues.SCISSORS, HandValues.SCISSORS),
        ).toBe(3);

        expect(roundScoreFightHand(HandValues.ROCK, HandValues.ROCK)).toBe(3);
        expect(roundScoreFightHand(HandValues.ROCK, HandValues.PAPER)).toBe(6);
        expect(roundScoreFightHand(HandValues.ROCK, HandValues.SCISSORS)).toBe(
            0,
        );

        expect(roundScoreFightHand(HandValues.PAPER, HandValues.PAPER)).toBe(3);
        expect(roundScoreFightHand(HandValues.PAPER, HandValues.ROCK)).toBe(0);
        expect(roundScoreFightHand(HandValues.PAPER, HandValues.SCISSORS)).toBe(
            6,
        );
    });

    test('handScoreFight', () => {
        expect(handScoreFight(HandValues.ROCK)).toBe(1);
        expect(handScoreFight(HandValues.PAPER)).toBe(2);
        expect(handScoreFight(HandValues.SCISSORS)).toBe(3);
    });

    test('getRockOutcome', () => {
        expect(getRockOutcome(OutcomeType.WIN)).toBe(HandValues.PAPER);
        expect(getRockOutcome(OutcomeType.LOSS)).toBe(HandValues.SCISSORS);
        expect(getRockOutcome(OutcomeType.DRAW)).toBe(HandValues.ROCK);
    });

    test('getPaperOutcome', () => {
        expect(getPaperOutcome(OutcomeType.WIN)).toBe(HandValues.SCISSORS);
        expect(getPaperOutcome(OutcomeType.LOSS)).toBe(HandValues.ROCK);
        expect(getPaperOutcome(OutcomeType.DRAW)).toBe(HandValues.PAPER);
    });

    test('getScissorOutcome', () => {
        expect(getScissorOutcome(OutcomeType.WIN)).toBe(HandValues.ROCK);
        expect(getScissorOutcome(OutcomeType.LOSS)).toBe(HandValues.PAPER);
        expect(getScissorOutcome(OutcomeType.DRAW)).toBe(HandValues.SCISSORS);
    });
});
