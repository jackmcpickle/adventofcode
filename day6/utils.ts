export function getMatchingPattern(stream: string, count: number) {
    const characters = stream.split('');
    let matchingCharIndex = 0;
    for (let index = 0; index < characters.length; index++) {
        const noMatchingLookahead = noMatchInGroup(
            characters.slice(index, index + count),
        );
        if (noMatchingLookahead) {
            matchingCharIndex = index + count;
            break;
        }
    }

    return matchingCharIndex;
}

export function noMatchInGroup<T>(chars: T[]): boolean {
    return chars.every(
        (item, index) => !chars.toSpliced(index, 1).includes(item),
    );
}
