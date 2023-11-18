import { CarryGroups, Result } from './types';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
    findMaxCaloriesIndex,
    getCaloriesGroupTotals,
    getCaloriesTotals,
    getGroupsFromFile,
    sortCarryGroups,
    sumCarryGroup,
} from './utils';

function findLargestBundle(data: string): Result {
    const groups = getGroupsFromFile(data);
    const totals = getCaloriesTotals(Object.values(groups));
    return findMaxCaloriesIndex(totals);
}

function findTop3BundlesSize(data: string): number {
    const groups = getGroupsFromFile(data);
    const carryGroupsTotal = getCaloriesGroupTotals(Object.values(groups));
    const [top1, top2, top3] = sortCarryGroups(carryGroupsTotal);
    return sumCarryGroup(top1, top2, top3);
}

function main() {
    const data = readFileSync(resolve(__dirname, './input.txt'), 'utf8');
    const maxIndex = findLargestBundle(data);
    const top3Total = findTop3BundlesSize(data);
    console.log({ top3Total, maxIndex });
}

main();
