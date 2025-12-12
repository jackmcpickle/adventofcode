// Advent of Code - Calibration Check

// Function to parse the input data
type Equation = { target: number; numbers: number[] };

export function parseInput(input: string): Equation[] {
    return input
        .trim()
        .split('\n')
        .map(line => {
            const [target, numbers] = line.split(':');
            return {
                target: parseInt(target.trim(), 10),
                numbers: numbers
                    .trim()
                    .split(' ')
                    .map(num => parseInt(num, 10)),
            };
        });
}

export function generateOperatorCombinations(n: number): string[][] {
    if (n === 1) return [[]];
    const smallerCombos = generateOperatorCombinations(n - 1);
    return smallerCombos.flatMap(combo => [
        [...combo, '+'],
        [...combo, '*'],
        [...combo, '||'],
    ]);
}

export function evaluateExpression(
    numbers: number[],
    operators: string[],
): number {
    return operators.reduce((result, operator, index) => {
        if (operator === '+') {
            return result + numbers[index + 1];
        } else if (operator === '*') {
            return result * numbers[index + 1];
        } else if (operator === '||') {
            return parseInt(
                result.toString() + numbers[index + 1].toString(),
                10,
            );
        }
        return result;
    }, numbers[0]);
}

export function isValidEquation(equation: Equation): boolean {
    const { target, numbers } = equation;
    const operatorCombinations = generateOperatorCombinations(numbers.length);

    for (const operators of operatorCombinations) {
        if (evaluateExpression(numbers, operators) === target) {
            return true;
        }
    }

    return false;
}

export function totalCalibrationResult(input: string): number {
    const equations = parseInput(input);
    return equations
        .filter(isValidEquation)
        .reduce((sum, eq) => sum + eq.target, 0);
}
