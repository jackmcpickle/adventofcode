import { readFile } from '../../helpers/readFile';
import { createData, part1, part2 } from './methods';


// const result = await part1(createData(readFile('./2025/day1/input.txt')));
// console.log('Final Result:', result);
const result = await part2(createData(readFile('./2025/day1/input.txt')));
console.log('Final Result:', result);
