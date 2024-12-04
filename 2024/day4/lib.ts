export function getXMASCount(xmasInput: string[]): number {
    const forward = xmasInput.reduce(forwardSearchForXMAS, 0);

    const backwards = xmasInput
        .map((line) => line.split('').toReversed().join(''))
        .reduce(forwardSearchForXMAS, 0);

    const vertical = xmasInput.reduce(verticalSearchForXMAS, 0);

    const backwardsVertical = xmasInput
        .toReversed()
        .reduce(verticalSearchForXMAS, 0);

    const diagonalForwards = xmasInput.reduce(diagonalSearchForXMAS, 0);

    const diagonalBackwardsVerticalBackwards = xmasInput
        .toReversed()
        .map((line) => line.split('').toReversed().join(''))
        .reduce(diagonalSearchForXMAS, 0);

    const diagonalBackwardsVertical = xmasInput
        .map((line) => line.split('').toReversed().join(''))
        .reduce(diagonalSearchForXMAS, 0);

    const diagonalVerticalBackwards = xmasInput
        .toReversed()
        .reduce(diagonalSearchForXMAS, 0);

    console.log({
        forward,
        backwards,
        vertical,
        diagonalForwards,
        backwardsVertical,
        diagonalBackwardsVerticalBackwards,
        diagonalBackwardsVertical,
        diagonalVerticalBackwards,
    });

    return (
        forward +
        backwards +
        vertical +
        diagonalForwards +
        backwardsVertical +
        diagonalBackwardsVerticalBackwards +
        diagonalBackwardsVertical +
        diagonalVerticalBackwards
    );
}

function forwardSearchForXMAS(
    acc: number,
    line: string,
    index: number,
    inputs: string[],
): number {
    const regexXMAS = /(XMAS)/g;
    const matches = line.matchAll(regexXMAS);
    const xmasMatches = Array.from(matches, (m) => m[0]);
    return acc + xmasMatches.length;
}

function verticalSearchForXMAS(
    acc: number,
    line: string,
    index: number,
    inputs: string[],
): number {
    const atLimit = index + 4 > inputs.length;
    if (atLimit) {
        console.log('At limit');
        return acc;
    }

    const match = line.split('').filter((char, charIndex) => {
        return (
            char === 'X' &&
            inputs[index + 1][charIndex] === 'M' &&
            inputs[index + 2][charIndex] === 'A' &&
            inputs[index + 3][charIndex] === 'S'
        );
    });

    return acc + match.length;
}

function diagonalSearchForXMAS(
    acc: number,
    line: string,
    index: number,
    inputs: string[],
): number {
    const atLimit = index + 4 > inputs.length;
    if (atLimit) {
        console.log('At limit');
        return acc;
    }

    const match = line.split('').filter((char, charIndex, charLine) => {
        const limit = charIndex + 4 > charLine.length;
        return (
            !limit &&
            char === 'X' &&
            inputs[index + 1][charIndex + 1] === 'M' &&
            inputs[index + 2][charIndex + 2] === 'A' &&
            inputs[index + 3][charIndex + 3] === 'S'
        );
    });

    return acc + match.length;
}

export function getMASMASCount(masmasInput: string[]): number {
    return masmasInput.reduce((acc, line, index, inputs) => {
        const atLimit = index + 3 > masmasInput.length;
        if (atLimit) {
            console.log('At limit');
            return acc;
        }

        const match = line.split('').filter((char, charIndex, charLine) => {
            const limit = charIndex + 3 > charLine.length;
            return (
                (!limit &&
                    // M.M
                    char === 'M' &&
                    inputs[index + 1][charIndex + 1] === 'A' &&
                    inputs[index + 2][charIndex + 2] === 'S' &&
                    charLine[charIndex + 2] === 'M' &&
                    inputs[index + 1][charIndex + 1] === 'A' &&
                    inputs[index + 2][charIndex] === 'S') ||
                // M.S
                (char === 'M' &&
                    inputs[index + 1][charIndex + 1] === 'A' &&
                    inputs[index + 2][charIndex + 2] === 'S' &&
                    charLine[charIndex + 2] === 'S' &&
                    inputs[index + 1][charIndex + 1] === 'A' &&
                    inputs[index + 2][charIndex] === 'M') ||
                // S.S
                (char === 'S' &&
                    inputs[index + 1][charIndex + 1] === 'A' &&
                    inputs[index + 2][charIndex + 2] === 'M' &&
                    charLine[charIndex + 2] === 'S' &&
                    inputs[index + 1][charIndex + 1] === 'A' &&
                    inputs[index + 2][charIndex] === 'M') ||
                // S.M
                (char === 'S' &&
                    inputs[index + 1][charIndex + 1] === 'A' &&
                    inputs[index + 2][charIndex + 2] === 'M' &&
                    charLine[charIndex + 2] === 'M' &&
                    inputs[index + 1][charIndex + 1] === 'A' &&
                    inputs[index + 2][charIndex] === 'S')
            );
        });

        return acc + match.length;
    }, 0);
}
