import { input as reports } from './input';
import {
    allSingleDirection,
    isDifferenceInLevelsBetweenOneAndThree,
} from './libs';

const safeRows = reports.reduce((acc, report) => {
    if (
        isDifferenceInLevelsBetweenOneAndThree(report) &&
        allSingleDirection(report)
    ) {
        return acc + 1;
    }
    return acc;
}, 0);

console.log(safeRows);
