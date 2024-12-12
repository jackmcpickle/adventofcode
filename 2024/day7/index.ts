import { readFile } from '../../helpers/readFile';
import { totalCalibrationResult } from './lib';

const input = readFile('./2024/day7/input.txt');

const value = totalCalibrationResult(input);

console.log(value);
