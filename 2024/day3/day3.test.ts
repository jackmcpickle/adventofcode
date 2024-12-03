import { describe, expect, test } from 'vitest';
import {
    calculateInstructions,
    parseMemoryInputs,
    parseMemoryInputsWithInstructions,
    parseMemoryValues,
} from './libs';

describe('DAY 3', () => {
    test('regex', () => {
        const input =
            'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';

        const muls = parseMemoryInputs(input);
        expect(muls?.length).toBe(4);

        expect(
            muls?.reduce((total, value) => {
                const [number1, number2] = parseMemoryValues(value);
                console.log(number1, number2);
                total += number1 * number2;
                return total;
            }, 0),
        ).toBe(161);
    });

    test('parseMemoryInputsWithInstructions', () => {
        const input =
            "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

        const muls = parseMemoryInputsWithInstructions(input);
        expect(muls?.length).toBe(6);
        let doCalculation = true;
        expect(
            muls?.reduce((subtotal, value) => {
                const [newSubTotal, newCalc] = calculateInstructions(
                    subtotal,
                    value,
                    doCalculation,
                );
                doCalculation = newCalc;
                return newSubTotal;
            }, 0),
        ).toBe(48);
    });
});
