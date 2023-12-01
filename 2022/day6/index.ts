import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { getMatchingPattern } from './utils';

function main() {
    const data = readFileSync(resolve(__dirname, './input.txt'), 'utf8');
    const startOfPacket = getMatchingPattern(data, 4);
    const startOfMessage = getMatchingPattern(data, 14);
    console.log({ startOfPacket, startOfMessage });
}

main();
