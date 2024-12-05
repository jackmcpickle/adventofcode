import { pages } from './pages';
import { rules } from './pageRules';

const correctRows = pages.filter((row, rowIndex, rows) => {
    return row.every((page, pageIndex) => {
        const matchingRules = rules.filter((row) => row[0] === page);
        console.log({ page, pageIndex, matchingRules });
        return matchingRules.every(([min, max]) => {
            console.log({ maxIndex: row.indexOf(max) });
            return row.indexOf(max) === -1 || pageIndex < row.indexOf(max);
        });
    });
});

// console.log({ correctRows });

const middlePageSize = correctRows.reduce((acc, row, rowIndex, rows) => {
    const middlePage = row[Math.round((row.length - 1) / 2)];
    console.log({ middlepage: middlePage });
    return acc + middlePage;
}, 0);

console.log({ middlePageSize });
