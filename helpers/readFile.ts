import { readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

export function readFile(path: string): string {
    return readFileSync(join(resolve(__dirname), '..', path), 'utf8');
}
