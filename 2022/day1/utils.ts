import {
    CalorieTotal,
    CalorieTotals,
    Calories,
    CarryGroupTotals,
    CarryGroups,
    CarryGroupsByIndex,
    Result,
} from './types';

export function sumCalories(calories: Calories): CalorieTotal {
    return calories.reduce((total, calorie) => total + calorie, 0);
}

export function getCaloriesTotals(group: CarryGroups): CalorieTotals {
    return group.map(sumCalories);
}

export function getCaloriesGroupTotals(groups: CarryGroups): CarryGroupTotals {
    return groups.map((group, index) => ({
        index: index,
        max: sumCalories(group),
    }));
}

export function findMaxCaloriesIndex(calorieTotals: CalorieTotals): Result {
    const maxResult = {
        max: 0,
        index: 0,
    } satisfies Result;
    calorieTotals.forEach((total, index) => {
        if (total > maxResult.max) {
            maxResult.index = index;
            maxResult.max = total;
        }
    });
    return maxResult;
}

export function sortCarryGroups(
    calorieTotals: CarryGroupTotals,
): CarryGroupTotals {
    return calorieTotals.toSorted((a, b) => b.max - a.max);
}

export function sumCarryGroup(...group: CarryGroupTotals) {
    return group.reduce((total, group) => total + group.max, 0);
}

export function getGroupsFromFile(data: string): CarryGroupsByIndex {
    const groups: CarryGroupsByIndex = { 0: [] };
    let groupIndex: number = 0;
    data.split('\n').forEach(number => {
        const count = Number(number);
        if (count === 0) {
            groupIndex = groupIndex + 1;
            return;
        }
        groups[groupIndex] = [...(groups[groupIndex] ?? []), count];
    });
    return groups;
}
