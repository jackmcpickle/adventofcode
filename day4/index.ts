import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import {
    countAllFullyOverlappedGroups,
    countPartialOverlappedGroups,
} from './utils';
function main() {
    const data = readFileSync(resolve(__dirname, './input.txt'), 'utf8');
    const overLayCount = countAllFullyOverlappedGroups(data);
    const partialOverlayCount = countPartialOverlappedGroups(data);
    console.log({ overLayCount, partialOverlayCount });
}

main();
