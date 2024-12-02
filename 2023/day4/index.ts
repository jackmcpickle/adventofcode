import { readFile } from '../../helpers/readFile';
import { getTotalCardsCound, getTotalCardsPower } from './utils';

function main() {
    console.time();
    const data = readFile('./2023/day4/input.txt');
    const power = getTotalCardsPower(data);
    const count = getTotalCardsCound(data);

    console.log({ power: 'redacted', count: 'redacted' });
    console.timeEnd();
}

main();
