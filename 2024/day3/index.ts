import { input as memoryInputs } from './input';
import {
    calculateInstructions,
    parseMemoryInputsWithInstructions,
} from './libs';

let doCalculation = true;
const memoryCalculationWithInstructions = memoryInputs.reduce(
    (total, memoryInput) => {
        const memoryValues = parseMemoryInputsWithInstructions(memoryInput);
        const newValue =
            total +
            memoryValues.reduce((subtotal, value) => {
                const [newSubTotal, newCalc] = calculateInstructions(
                    subtotal,
                    value,
                    doCalculation,
                );
                doCalculation = newCalc;
                return newSubTotal;
            }, 0);
        return newValue;
    },
    0,
);

console.log({ memoryCalculationWithInstructions });

112508982;
112272912;
