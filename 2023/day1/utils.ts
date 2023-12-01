import { isNotNaN } from '../../helpers/isNotNaN';
import { isNotNull } from '../../helpers/isNotNull';

type RawCalibrationInput = number[];
type CalibrationInput = [number, number];

const DIGIT_MAP = {
    1: 1,
    one: 1,
    2: 2,
    two: 2,
    3: 3,
    three: 3,
    4: 4,
    four: 4,
    5: 5,
    five: 5,
    6: 6,
    six: 6,
    7: 7,
    seven: 7,
    8: 8,
    eight: 8,
    9: 9,
    nine: 9,
    0: 0,
    zero: 0,
};

export function getDigitMatcher(): RegExp {
    return new RegExp(`(?=(${Object.keys(DIGIT_MAP).join('|')}))`, 'gmi');
}

export function convertToRawCalibrationInput(
    input: string,
): RawCalibrationInput[] {
    const data = input.split('\n');
    // regex remove all letter and keep numbers
    const selectNum = new RegExp('[a-z]+', 'gmi');
    const calibration = data.map((text) =>
        text.replace(selectNum, '').split('').map(Number).filter(isNotNaN),
    );
    return calibration as RawCalibrationInput[];
}

export function takeCalibrationInput(
    input: RawCalibrationInput[],
): CalibrationInput[] {
    return input.map((calibration) => [
        calibration[0],
        calibration[calibration.length - 1],
    ]);
}

export function reduceCalibrationInput(input: CalibrationInput[]): number {
    return input.reduce((acc, [start, end]) => {
        const range = Number(`${start}${end}`);
        return acc + range;
    }, 0);
}

export function findLargestBundle(input: string): number {
    const raw = convertToRawCalibrationInput(input);
    const inputCalibrations = takeCalibrationInput(raw);
    return reduceCalibrationInput(inputCalibrations);
}

export function findLargestWithWordsBundle(input: string): number {
    const raw = searchForDigitWord(input);
    const inputCalibrations = takeCalibrationInput(raw);
    return reduceCalibrationInput(inputCalibrations);
}

export function searchForDigitWord(input: string): RawCalibrationInput[] {
    const data = input.split('\n');
    return data.map((line) => mapDigitWord(line));
}

export function mapDigitWord(line: string): RawCalibrationInput {
    const matches = line.matchAll(getDigitMatcher());
    const digits = [];
    for (const match of matches) {
        const key = match[1] as keyof typeof DIGIT_MAP;
        digits.push(DIGIT_MAP[key]);
    }
    return digits;
}
