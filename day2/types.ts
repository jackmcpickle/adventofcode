export const HandIcons = {
    ROCK: '🪨',
    PAPER: '📃',
    SCISSORS: '✂️',
    A: '🪨',
    B: '📃',
    C: '✂️',
    // ANSWER MAP
    X: '🪨',
    Y: '📃',
    Z: '✂️',
};

export const enum HandType {
    ROCK = 'ROCK',
    PAPER = 'PAPER',
    SCISSORS = 'SCISSORS',
}

export const enum OutcomeType {
    WIN = 'WIN',
    LOSS = 'LOSS',
    DRAW = 'DRAW',
}

export type HandKey = keyof typeof HandIcons;

export type HandKeyType = Record<HandKey, HandType>;

export const HandValues = {
    ROCK: HandType.ROCK,
    PAPER: HandType.PAPER,
    SCISSORS: HandType.SCISSORS,
    A: HandType.ROCK,
    B: HandType.PAPER,
    C: HandType.SCISSORS,
    X: HandType.ROCK,
    Y: HandType.PAPER,
    Z: HandType.SCISSORS,
} satisfies HandKeyType;

export type WinLossKey = 'X' | 'Y' | 'Z' | 'LOSS' | 'WIN' | 'DRAW';
export type WinOrLossType = Record<WinLossKey, OutcomeType>;

export const WIN_LOW_DRAW = {
    X: OutcomeType.LOSS,
    Y: OutcomeType.DRAW,
    Z: OutcomeType.WIN,
    LOSS: OutcomeType.LOSS,
    DRAW: OutcomeType.DRAW,
    WIN: OutcomeType.WIN,
} satisfies WinOrLossType;

export const HandScoreMap = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3,
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
} satisfies Record<HandKey, number>;

export const ROUND_SCORE = {
    win: 6,
    draw: 3,
    loss: 0,
};

export type RoundHand = [HandKey, HandKey];

export type TotalRounds = ReadonlyArray<[HandKey, HandKey]>;

export type TotalStrategyRounds = ReadonlyArray<[HandType, WinLossKey]>;
