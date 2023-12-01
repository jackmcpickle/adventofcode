import {
    HandValues,
    HandScoreMap,
    ROUND_SCORE,
    HandKey,
    WIN_LOW_DRAW,
    HandType,
    WinLossKey,
} from './types';

export function toFormat<Type>(data: string): Type {
    const rounds = data.split('\n');
    return rounds.map(round => {
        const [elf, you] = round.split(' ') as [HandKey, HandKey];
        return [elf, you];
    }) as Type;
}

export function roundScoreFightHand(
    baseHand: string,
    scoreHand: string,
): number {
    switch (true) {
        case baseHand === scoreHand:
            return ROUND_SCORE.draw;

        case baseHand === HandValues.ROCK && scoreHand === HandValues.PAPER: {
            return ROUND_SCORE.win;
        }
        case baseHand === HandValues.PAPER &&
            scoreHand === HandValues.SCISSORS: {
            return ROUND_SCORE.win;
        }
        case baseHand === HandValues.SCISSORS &&
            scoreHand === HandValues.ROCK: {
            return ROUND_SCORE.win;
        }
        default:
            return ROUND_SCORE.loss;
    }
}

export function handScoreFight(hand: HandKey): number {
    return HandScoreMap[hand];
}

export function getMatchingRoundHand(
    baseHand: HandType,
    winOrLoss: WinLossKey,
): HandType {
    switch (baseHand) {
        case HandValues.ROCK:
            return getRockOutcome(winOrLoss);
        case HandValues.PAPER:
            return getPaperOutcome(winOrLoss);
        case HandValues.SCISSORS:
            return getScissorOutcome(winOrLoss);
        default:
            const _exhaustiveCheck: never = baseHand;
            return _exhaustiveCheck;
    }
}

export function getRockOutcome(winOrLoss: WinLossKey): HandType {
    // HandType.ROCK
    switch (winOrLoss) {
        case WIN_LOW_DRAW.Z:
        case WIN_LOW_DRAW.WIN:
            return HandValues.PAPER;
        case WIN_LOW_DRAW.X:
        case WIN_LOW_DRAW.LOSS:
            return HandValues.SCISSORS;
        case WIN_LOW_DRAW.Y:
        case WIN_LOW_DRAW.DRAW:
            return HandValues.ROCK;
        default:
            return HandValues.ROCK;
    }
}

export function getPaperOutcome(winOrLoss: WinLossKey): HandType {
    // HandType.PAPER
    switch (winOrLoss) {
        case WIN_LOW_DRAW.Z:
        case WIN_LOW_DRAW.WIN:
            return HandValues.SCISSORS;
        case WIN_LOW_DRAW.X:
        case WIN_LOW_DRAW.LOSS:
            return HandValues.ROCK;
        case WIN_LOW_DRAW.Y:
        case WIN_LOW_DRAW.DRAW:
            return HandValues.PAPER;
        default:
            return HandValues.PAPER;
    }
}

export function getScissorOutcome(winOrLoss: WinLossKey): HandType {
    // HandType.SCISSORS
    switch (winOrLoss) {
        case WIN_LOW_DRAW.Z:
        case WIN_LOW_DRAW.WIN:
            return HandValues.ROCK;
        case WIN_LOW_DRAW.X:
        case WIN_LOW_DRAW.LOSS:
            return HandValues.PAPER;
        case WIN_LOW_DRAW.Y:
        case WIN_LOW_DRAW.DRAW:
            return HandValues.SCISSORS;
        default:
            return HandValues.SCISSORS;
    }
}

function assertUnreachable(p: never): never;

function assertUnreachable(key: WinLossKey) {
    throw new Error(`Unexpected WinLossKey ${key}`);
}
