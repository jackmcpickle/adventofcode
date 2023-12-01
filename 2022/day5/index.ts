import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { getTopMultiStackItems, getTopSingleStackItems } from './utils';

function main() {
    const moveData = readFileSync(resolve(__dirname, './move.txt'), 'utf8');
    const stackData = readFileSync(resolve(__dirname, './stacks.txt'), 'utf8');
    const topStacks = getTopSingleStackItems(moveData, stackData);
    const topMultiStacks = getTopMultiStackItems(moveData, stackData);
    console.log({ topStacks, topMultiStacks });
}

main();
