import { input as puzzleInput } from './input';
import { getMASMASCount, getXMASCount } from './lib';

const total = getXMASCount(puzzleInput);
const totalMas = getMASMASCount(puzzleInput);

console.log({ total, totalMas });
