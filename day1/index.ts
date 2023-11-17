const elf1 = [1000,2000,3000,]

const elf2 = [4000];

const elf3 = [5000, 6000];

7000;
8000;
9000;

10000;

type Calories = ReadonlyArray<number>;
type Calorie = number;
type CalorieTotal = number;
type Carry = ReadonlyArray<Calorie>;
type CarryGroup = ReadonlyArray<Carry>;
type CalorieTotals = ReadonlyArray<CalorieTotal>;


function main() {

}

function sumCalories(calories: Calories): CalorieTotal {
    return calories.reduce((total, calorie) => total + calorie, 0);
}

function getCaloriesIndex(group: CarryGroup): CalorieTotals {
    return group.map(sumCalories);
}

function sortCaloriesIndex(calorieTotals: CalorieTotals) {
    retrun calorieTotals.toSorted((a, b) => a - b);
}
