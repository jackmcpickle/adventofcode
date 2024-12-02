import { readFile } from '@/helpers/readFile';
import { sumAllGearRatios, sumOfAllPossibleMatches } from './utils';

function main() {
    const data = readFile('./2023/day3/input.txt');
    const sumOfMatches = sumOfAllPossibleMatches(data);
    const gearTotal = sumAllGearRatios(data);
    console.log({ sumOfMatches, gearTotal });
}

main();
