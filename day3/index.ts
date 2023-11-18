import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { sumTotalDuplicatesGroups, sumTotalListOfSacks } from './utils';

function main() {
    const data = readFileSync(resolve(__dirname, './input.txt'), 'utf8');
    const totalSum = sumTotalListOfSacks(data);
    const groupSum = sumTotalDuplicatesGroups(data);
    console.log({ totalSum, groupSum });
}

main();
