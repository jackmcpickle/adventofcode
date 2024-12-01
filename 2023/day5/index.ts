import { readFile } from '../../helpers/readFile';
import {
    findLocationFromSearchIdRange,
    parseAlmanacMaps,
    findLocationFromSearchId,
} from './utils';
import { SEEDS, fullSeedRange } from './seeds';

function main() {
    const data = readFile('./2023/day5/input.txt');
    const almanacs = parseAlmanacMaps(data);
    // const locationIds = SEEDS.map((seedId) => {
    //     const match = findLocationFromSearchId(
    //         seedId,
    //         almanacs,
    //         'seed',
    //         'location',
    //     );
    //     return match;
    // }).sort((a, b) => a - b);

    const ranges = fullSeedRange.map((range, index) => {
        let lowest = 9999999999;
        let matchId = range.min;
        console.time('range');
        console.log('asdas');
        while (matchId <= range.max) {
            console.time('range max');
            const match = findLocationFromSearchId(
                matchId,
                almanacs,
                'seed',
                'location',
            );
            matchId++;
            if (matchId % 1000000 === 0) {
                console.timeEnd('range max');
                console.log({ match });
            }
            lowest = match < lowest ? match : lowest;
        }
        console.timeEnd('range');
        console.log({ lowest, index, matchId });
        return lowest;
    });

    console.log(Math.min(...ranges));
}

main();
