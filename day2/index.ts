import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import {
    HandValues,
    TotalRounds,
    TotalStrategyRounds,
    WIN_LOW_DRAW,
} from './types';
import {
    getMatchingRoundHand,
    handScoreFight,
    roundScoreFightHand,
    toFormat,
} from './utils';

export function findYourTotalScore(data: string) {
    const format = toFormat<TotalRounds>(data);
    return format.reduce((score, [elf, you]) => {
        return (
            score +
            roundScoreFightHand(HandValues[elf], HandValues[you]) +
            handScoreFight(you)
        );
    }, 0);
}

export function findCorrectStrategyScore(data: string) {
    const format = toFormat<TotalStrategyRounds>(data);
    return format.reduce((score, [elf, winOfLose]) => {
        const hand = getMatchingRoundHand(
            HandValues[elf],
            WIN_LOW_DRAW[winOfLose],
        );
        const fightScore = roundScoreFightHand(
            HandValues[elf],
            HandValues[hand],
        );
        const handScore = handScoreFight(hand);
        return score + fightScore + handScore;
    }, 0);
}

function main() {
    const data = readFileSync(resolve(__dirname, './input.txt'), 'utf8');
    const totalScore = findYourTotalScore(data);
    const strategyScore = findCorrectStrategyScore(data);
    console.log({ totalScore, strategyScore });
}

main();
