export function lowestLocationNumber(seeds: string, input: string): number {}

const MAP_NAMES = /([a-z]+)\-to\-([a-z]+)/gm;
const MAP_NAMES_EXCLUDE = /([a-z]+)\-to\-([a-z]+) map/gm;

export function parseAlmanacMaps(input: string): AlmanacMap[] {
    const groups = input.matchAll(MAP_NAMES);
    const numberMaps = input
        .replace(MAP_NAMES_EXCLUDE, '')
        .split(':')
        .filter((n) => n.trim())
        .map((line) =>
            line
                .split('\n')
                .filter((n) => n.trim())
                .reduce((group, line) => {
                    const [destination, source, length] = line.split(' ');
                    if (
                        isNotNumber(length) ||
                        isNotNumber(destination) ||
                        isNotNumber(source)
                    ) {
                        throw new Error(`Invalid map: ${line}`);
                    }
                    group.push({
                        length: Number(length),
                        destination: Number(destination),
                        source: Number(source),
                    } satisfies ParseRange);
                    return group;
                }, [] as ParseRange[]),
        );
    let index = 0;
    const almanacMaps: AlmanacMap[] = [];
    for (const match of groups) {
        const numbers = numberMaps[index];
        const almanac = {
            ranges: numbers.sort((a, b) => a.source - b.source),
            sourceName: match[1],
            destinationName: match[2],
        } satisfies AlmanacMap;
        almanacMaps.push(almanac);
        index++;
    }
    return almanacMaps;
}

function isNotNumber(n: string): boolean {
    return Number.isNaN(Number(n));
}

export function searchAlmanacMap(
    almanacMaps: AlmanacMap[],
    sourceName: string,
    destinationName: string,
): AlmanacMap | undefined {
    return almanacMaps.find(
        (almanac) =>
            almanac.sourceName === sourceName &&
            almanac.destinationName === destinationName,
    );
}

export function findLocationFromSearchId(
    searchId: number,
    almanacMaps: AlmanacMap[],
    sourceName: string,
    destinationName: string,
): number {
    const startAlmanac = almanacMaps.find(
        (almanac) => almanac.sourceName === sourceName,
    )!;
    let matchId = 0;
    const matchingRange = startAlmanac.ranges.filter((range) => {
        const min = range.source;
        const max = range.source + range.length - 1;
        return searchId >= min && searchId <= max;
    });
    const closestRange = startAlmanac.ranges.filter((range) => {
        const min = range.source;
        return searchId > min;
    });
    matchingRange.forEach((range, index) => {
        const min = range.source;
        const max = range.source + range.length - 1;
        // console.log({ min, max, index });
        if (searchId >= min && searchId <= max) {
            matchId = range.destination - range.source + searchId;
        }
    });
    if (matchingRange.length === 0) {
        closestRange.forEach((range, index) => {
            const min = range.source;
            // console.log({ min, index });
            if (matchId === 0 && searchId < min)
                matchId = range.destination - index + searchId;
        });
    }

    if (matchId === 0) {
        matchId = searchId;
    }
    // console.log({ hasMatch: matchId, closestRange, matchingRange });

    if (startAlmanac.destinationName === destinationName) {
        return matchId;
    }

    return findLocationFromSearchId(
        matchId,
        almanacMaps,
        startAlmanac.destinationName,
        destinationName,
    );
}

export function findLocationFromSearchIdRange(
    searchStart: number,
    searchEnd: number,
    almanacMaps: AlmanacMap[],
    sourceName: string,
    destinationName: string,
): number {
    const startAlmanac = almanacMaps.find(
        (almanac) => almanac.sourceName === sourceName,
    )!;
    let matchId = 0;
    const matchingRange = startAlmanac.ranges.filter((range) => {
        const [min, max] = getMinMaxRangeSource(range);
        // both searches are inside range?
        return (
            searchStart >= min &&
            searchStart <= max &&
            searchEnd >= min &&
            searchEnd <= max
        );
    });
    const closestRange = startAlmanac.ranges.filter((range) => {
        const min = range.source;
        return searchStart > min && searchEnd > min;
    });
    matchingRange.forEach((range) => {
        const [min, max] = getMinMaxRangeSource(range);
        console.log('matchingRange', { min, max });
        if (searchStart >= min && searchStart <= max) {
            matchId = range.destination - range.source + searchStart;
        }
    });
    if (matchingRange.length === 0) {
        closestRange.forEach((range, index) => {
            const [min] = getMinMaxRangeSource(range);
            if (matchId === 0 && searchStart < min)
                matchId = range.destination - index + searchStart;
        });
    }

    if (matchId === 0) {
        matchId = searchStart;
    }
    console.log({
        searchStart,
        searchEnd,
        hasMatch: matchId,
        closestRange,
        matchingRange,
    });

    if (startAlmanac.destinationName === destinationName) {
        return matchId;
    }

    return findLocationFromSearchId(
        matchId,
        almanacMaps,
        startAlmanac.destinationName,
        destinationName,
    );
}

export function createSearchSeeds(input: string): [] {}

export function getMinMaxRangeSource(range: ParseRange): [number, number] {
    const min = range.source;
    const max = range.source + range.length - 1;
    return [min, max];
}
