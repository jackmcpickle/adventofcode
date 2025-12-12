import { Card } from './types';
import { intersection } from 'lodash-es';

const GAME_ID_SELECTOR = /(?<=Card[\s]+)([0-9]+)/gm;
const NUMBER_SELECTOR = /([0-9]+)/gm;

export function parseCards(input: string): Card[] {
    return input.split('\n').map(parseCard);
}

export function parseCard(game: string): Card {
    const id = game.match(GAME_ID_SELECTOR)?.[0] ?? '9999';
    const [winners, hand] = parseCardHands(game);
    const matching = intersection(winners, hand);
    return {
        id: Number(id),
        winners: winners,
        winningCount: matching.length,
        hand: hand,
    } satisfies Card;
}

export function parseCardHands(lines: string): number[][] {
    return lines.split(':')[1].split('|').map(parseCardHand);
}

export function parseCardHand(setline: string): number[] {
    const numberMatch = setline.matchAll(NUMBER_SELECTOR);
    const sets: number[] = [];
    for (const match of numberMatch) {
        const [number] = match;
        sets.push(Number(number));
    }
    return sets;
}

export function getCardPower(game: Card): number {
    return game.winningCount === 0 ? 0 : Math.pow(2, game.winningCount - 1);
}

export function getTotalCardsPower(input: string): number {
    const cards = parseCards(input);
    return cards.reduce((sum, game) => sum + getCardPower(game), 0);
}

export function getTotalCardsCound(input: string): number {
    const cards = parseCards(input);
    const cardCounts = new Map<number, number>();
    cards.forEach(card => cardCounts.set(card.id, 1));
    cards.forEach(card => {
        Array.from(Array(card.winningCount).keys()).forEach(i => {
            const indexKey = card.id + i + 1;
            const cardCount = cardCounts.get(card.id)!;
            const count = cardCounts.get(indexKey)!;
            cardCounts.set(indexKey, cardCount + count);
        });
    });
    let total = 0;
    for (const [key, value] of cardCounts.entries()) {
        total += value;
    }
    return total;
}
