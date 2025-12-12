import { input } from './input';

const locationOne = input.flatMap(row => row[0]).sort();
const locationTwo = input.flatMap(row => row[1]).sort();

const totalDistance = locationOne.reduce((acc, curr, index) => {
    acc += Math.abs(curr - locationTwo[index]);
    return acc;
}, 0);

console.log(totalDistance);

const similarity = locationOne.reduce((acc, curr) => {
    acc += curr * locationTwo.filter(item => item === curr)?.length;
    return acc;
}, 0);

console.log(similarity);
