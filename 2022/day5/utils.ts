import { isNotNull } from '../../helpers/isNotNull';
import { Stack } from './stack';
import { InstructionSet } from './types';

export function makeInstructionSet(line: string): InstructionSet {
    // parse move x from y to z
    const moveLength = 'move '.length;
    const fromLength = 'from '.length;
    const toLength = 'to '.length;
    const removedMove = line.substring(moveLength); // remove 'move ';
    const fromIndex = removedMove.search('from');
    const moveNumber = removedMove.substring(0, fromIndex);
    const toIndex = removedMove.search('to');
    const fromNumber = removedMove.substring(fromIndex + fromLength, toIndex); // remove 'from ';
    const toNumber = removedMove.substring(toIndex + toLength);
    // console.log({ moveNumber, fromNumber, toNumber });

    return {
        move: Number(moveNumber),
        from: Number(fromNumber),
        to: Number(toNumber),
    };
}

export function executeSingleInstructionOnStacks(
    stacks: Stack<string>[],
    instructionSets: InstructionSet[],
) {
    instructionSets.forEach(instruction => {
        const moves = makeIterator(instruction.move);
        moves.forEach(() => {
            const stackFrom = getStackById(stacks, instruction.from);
            const stackTo = getStackById(stacks, instruction.to);
            const item = stackFrom?.pop();
            if (item && stackTo) stackTo.push(item);
        });
    });
    return stacks;
}

export function executeMultiMoveInstructionOnStacks(
    stacks: Stack<string>[],
    instructionSets: InstructionSet[],
) {
    instructionSets.forEach(instruction => {
        const moves = makeIterator(instruction.move);
        const stackFrom = getStackById(stacks, instruction.from);
        const stackTo = getStackById(stacks, instruction.to);
        const items = moves.map(() => stackFrom && stackFrom.pop());
        if (stackTo) {
            items
                .reverse()
                .filter(isNotNull)
                .forEach(item => stackTo.push(item));
        }
    });
    return stacks;
}

export function makeStack(lines: string): Stack<string>[] {
    const rows = lines.split('\n');
    const rowSize = 3;
    const gapSize = 1;
    const stackSplitSize = 4;
    const missingStack = 1;
    const numberOfStack =
        // count length then minus last row
        ((rows.at(0)?.length ?? stackSplitSize) - rowSize) / stackSplitSize +
        missingStack;
    const columns = makeIterator(numberOfStack);
    const stacks = makeIterator(numberOfStack).map(() => new Stack<string>());

    rows.forEach(data => {
        columns.forEach(col => {
            const rangeFrom = getStart(col, rowSize, gapSize);
            const rangeTo = getEnd(col, rowSize, gapSize);
            const stackString = data.substring(rangeFrom, rangeTo);
            if (!Number.isNaN(Number(stackString))) {
                stacks[col].setId(Number(stackString));
            } else {
                stacks[col].push(getEncasedChat(stackString));
            }
        });
    });

    stacks.forEach(stack => {
        stack.flip();
    });
    return stacks;
}

export function getStart(
    number: number,
    rowSize: number,
    gapSize: number,
): number {
    return rowSize * number + number * gapSize;
}

export function getEnd(
    number: number,
    rowSize: number,
    gapSize: number,
): number {
    return rowSize * number + rowSize + number * gapSize;
}

export function makeIterator(count: number): number[] {
    return Array(count)
        .fill(null)
        .map((_, i) => i);
}

export function getEncasedChat(input: string): string {
    return input.replace(/\[/gm, '').replace(/\]/gm, '');
}

export function makeInstructionSets(input: string): InstructionSet[] {
    return input.split('\n').map(makeInstructionSet);
}

export function getTopSingleStackItems(
    instructionData: string,
    stackData: string,
): string {
    const instructions = makeInstructionSets(instructionData);
    const stacks = makeStack(stackData);
    const movedStacks = executeSingleInstructionOnStacks(stacks, instructions);
    return movedStacks.reduce((acc, stack) => {
        return acc + stack.pop();
    }, '');
}

export function getTopMultiStackItems(
    instructionData: string,
    stackData: string,
): string {
    const instructions = makeInstructionSets(instructionData);
    const stacks = makeStack(stackData);
    const movedStacks = executeMultiMoveInstructionOnStacks(
        stacks,
        instructions,
    );
    return movedStacks.reduce((acc, stack) => {
        return acc + stack.pop();
    }, '');
}

function getStackById(
    stacks: Stack<string>[],
    id: number,
): Stack<string> | undefined {
    return stacks.find(stack => stack.getId() === id);
}
