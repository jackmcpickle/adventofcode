import { pages } from './pages';
import { rules } from './pageRules';

const correctRows = pages.filter((row, rowIndex, rows) => {
    return row.every((page, pageIndex) => {
        const matchingRules = rules.filter((row) => row[0] === page);
        return matchingRules.every(([min, max]) => {
            return row.indexOf(max) === -1 || pageIndex < row.indexOf(max);
        });
    });
});

const middlePageSize = correctRows.reduce((acc, row, rowIndex, rows) => {
    const middlePage = row[Math.round((row.length - 1) / 2)];
    return acc + middlePage;
}, 0);

