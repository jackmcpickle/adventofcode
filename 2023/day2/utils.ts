import { Game, GameSets } from './types';

const GAME_ID_SELECTOR = new RegExp('(?<=Game )([0-9]+)', 'gmi');
const GREEN_SELECTOR = new RegExp('(([0-9]+ green)(?=,)?)', 'gmi');
const RED_SELECTOR = new RegExp('(([0-9]+ red)(?=,)?)', 'gmi');
const BLUE_SELECTOR = new RegExp('(([0-9]+ blue)(?=,)?)', 'gmi');

export function parseGames(input: string): Game[] {
    return input.split('\n').map(parseGame);
}

export function parseGame(game: string): Game {
    const id = game.match(GAME_ID_SELECTOR)?.[0] ?? '0';
    const sets = parseGameSets(game);
    return {
        id: Number(id),
        sets: sets,
    } satisfies Game;
}

export function parseGameSets(lines: string): GameSets[] {
    return lines.split(';').map(parseGameSet);
}

export function parseGameSet(setline: string): GameSets {
    const greenMatch = setline.match(GREEN_SELECTOR)?.[0] ?? '0';
    const [greenNumber] = greenMatch.split(' ');
    const redMatch = setline.match(RED_SELECTOR)?.[0] ?? '0';
    const [redNumber] = redMatch.split(' ');
    const blueMatch = setline.match(BLUE_SELECTOR)?.[0] ?? '0';
    const [blueNumber] = blueMatch.split(' ');

    return {
        green: Number(greenNumber),
        red: Number(redNumber),
        blue: Number(blueNumber),
    } satisfies GameSets;
}

export function findMinimumSet(games: GameSets[]): GameSets {
    const minSet = {
        green: 0,
        red: 0,
        blue: 0,
    } satisfies GameSets;
    games.forEach((game) => {
        minSet.blue = minSet.blue <= game.blue ? game.blue : minSet.blue;
        minSet.red = minSet.red <= game.red ? game.red : minSet.red;
        minSet.green = minSet.green <= game.green ? game.green : minSet.green;
    });
    return minSet;
}

export function getGamePower(game: Game): number {
    const minSet = findMinimumSet(game.sets);
    return minSet.blue * minSet.green * minSet.red;
}

export function getTotalGamesPower(input: string): number {
    const games = parseGames(input);
    return games.reduce((sum, game) => sum + getGamePower(game), 0);
}

export function isPossibleGame(games: GameSets[], maxSet: GameSets): boolean {
    return games.every(
        (game) =>
            game.blue <= maxSet.blue &&
            game.red <= maxSet.red &&
            game.green <= maxSet.green,
    );
}

export function findTotalMatchingGameIds(
    data: string,
    possibleGame: GameSets,
): number {
    const games = parseGames(data);
    const possible = games.filter((game) =>
        isPossibleGame(game.sets, possibleGame),
    );
    return possible.reduce((sum, game) => sum + game.id, 0);
}
