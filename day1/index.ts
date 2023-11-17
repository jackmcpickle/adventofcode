import { CarryGroups } from './types';
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

function findLargestBundle(data: string) {
    const groups = getGroupsFromFile(data);
    const totals = getCaloriesTotals(Object.values(groups));
    const maxIndex = findMaxCaloriesIndex(totals);
    console.log({ maxIndex });
}

function findTop3BundlesSize(data: string) {
    const groups = getGroupsFromFile(data);
    const carryGroupsTotal = getCaloriesGroupTotals(Object.values(groups));
    const [top1, top2, top3] = sortCarryGroups(carryGroupsTotal);
    console.log([top1, top2, top3]);
    const top3Total = sumCarryGroup(top1, top2, top3);
    console.log({ top3Total });
}

function main() {
    const data = readFileSync(resolve(__dirname, './input.txt'), 'utf8');
    findLargestBundle(data);
    findTop3BundlesSize(data);
}

main();
