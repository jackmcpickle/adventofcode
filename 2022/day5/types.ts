export type InstructionSet = {
    move: number;
    from: number;
    to: number;
};

export function isNotNull<T>(value: T): value is NonNullable<T> {
    return value != null;
}
