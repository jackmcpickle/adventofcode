import { readFile } from '../../helpers/readFile';
import { GameSets } from './types';
import { findTotalMatchingGameIds, getTotalGamesPower } from './utils';

function main() {
    const data = readFile('./2023/day2/input.txt');

    const possibleGame = {
        red: 12,
        green: 13,
        blue: 14,
    } satisfies GameSets;

    const total = findTotalMatchingGameIds(data, possibleGame);
    const power = getTotalGamesPower(data);
    console.log({ total, power });
}

main();
