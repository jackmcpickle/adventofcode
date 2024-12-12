export function parseMemoryInputs(input: string): string[] {
    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    return input.match(mulRegex) ?? [];
}

export function parseMemoryInputsWithInstructions(input: string): string[] {
    const mulRegex = /(mul\((\d{1,3}),(\d{1,3})\))|(do\(\))|(don't\(\))/g;
    return input.match(mulRegex) ?? [];
}

export function doInstructions(input: string): boolean {
    const doRegex = /do\(\)/g;
    return doRegex.test(input);
}

export function donNotInstructions(input: string): boolean {
    const doNotRegex = /don't\(\)/g;
    return doNotRegex.test(input);
}

export function parseMemoryValues(input: string): number[] {
    const numberRegex = /(\d{1,3})/gm;
    const [number1, number2] = input.match(numberRegex) ?? ['0', '0'];
    return [Number(number1), Number(number2)];
}

export function calculateInstructions(
    subtotal: number,
    value: string,
    doCalculation: boolean,
): [number, boolean] {
    if (donNotInstructions(value)) {
        doCalculation = false;
    }

    if (doInstructions(value)) {
        doCalculation = true;
    }

    if (!doCalculation) {
        return [subtotal, doCalculation];
    }

    const [number1, number2] = parseMemoryValues(value);
    const newSubTotal = subtotal + number1 * number2;

    return [newSubTotal, doCalculation];
}
