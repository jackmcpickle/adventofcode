export enum Direction {
    Inc = 'Inc',
    Dec = 'Dec',
}

export function isReportDecreasing(report: number[]): Direction {
    const decreasing = report?.[0] > report?.[1];
    return decreasing ? Direction.Dec : Direction.Inc;
}

export function allSingleDirection(report: number[]): boolean {
    const decreasing = isReportDecreasing(report);
    return report.every((item, index, rep) =>
        compareValues(item, rep?.[index + 1], decreasing),
    );
}

export function isDifferenceInLevelsBetweenOneAndThree(
    report: number[],
): boolean {
    return report.every((item, index, rep) => {
        if (index === 0) {
            return differenceBetweenValuesIsOneAndThree(item, rep?.[index + 1]);
        }
        if (index === rep.length - 1) {
            return true;
        }
        return (
            differenceBetweenValuesIsOneAndThree(item, rep?.[index - 1]) &&
            differenceBetweenValuesIsOneAndThree(item, rep?.[index + 1])
        );
    });
}

function compareValues(val1: number, val2: number, direction: Direction) {
    if (val2 === undefined) {
        return true;
    }
    if (direction === Direction.Dec) {
        return val1 > val2;
    }
    return val1 < val2;
}

function differenceBetweenValuesIsOneAndThree(val1: number, val2: number) {
    return Math.abs(val1 - val2) < 4 && Math.abs(val1 - val2) > 0;
}
