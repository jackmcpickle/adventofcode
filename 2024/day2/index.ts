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
    for (let i = 0; i < report.length; i++) {
        const reducedReport = [...report];
        reducedReport.splice(i, 1);
        if (
            isDifferenceInLevelsBetweenOneAndThree(reducedReport) &&
            allSingleDirection(reducedReport)
        ) {
            return acc + 1;
        }
    }
    return acc;
}, 0);

console.log({ safeRows });
