import { readFile } from '../../helpers/readFile';
import { findLargestBundle, findLargestWithWordsBundle } from './utils';

function main() {
    const data = readFile('./2023/day1/input.txt');
    const sum = findLargestBundle(data);
    const wordSum = findLargestWithWordsBundle(data);
    console.log({ sum, wordSum });
}

main();
