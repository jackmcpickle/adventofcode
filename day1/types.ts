export type Calories = ReadonlyArray<number>;
export type Calorie = number;
export type CalorieTotal = number;

export type CarryBundle = ReadonlyArray<Calorie>;
export type CarryGroups = ReadonlyArray<CarryBundle>;
export type CarryGroupsByIndex = Record<number, CarryBundle>;
export type CarryGroupTotals = ReadonlyArray<Result>;
export type CalorieTotals = ReadonlyArray<CalorieTotal>;

export type Result = {
    max: CalorieTotal;
    index: number;
};
