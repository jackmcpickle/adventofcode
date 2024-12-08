import { grid as input } from './grid';
import { getGrid, renderGrid } from './lib';

const outCoordinates = getGrid(input);
const output = renderGrid(input, outCoordinates);
console.log(output);
console.log({ total: outCoordinates.size });
