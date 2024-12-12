import { pages } from './pages';
import { rules } from './pageRules';

const inputCorrectRows = pages.filter((row) => {
    return row.some((page, pageIndex) => {
        const matchingRules = rules.filter((row) => row[0] === page);

        return matchingRules.some(([_, comparePage]) => {
            const match =
                row.indexOf(comparePage) !== -1 &&
                pageIndex > row.indexOf(comparePage);
            return match;
        });
    });
});

const correctedRows = inputCorrectRows.map((row) => {
    const newRow = row.toSorted((pageA, pageB) => {
        const matchedRule = rules.find(
            (row) => row[0] === pageA && row[1] === pageB,
        );
        if (!matchedRule) {
            return 0;
        }
        const [min, max] = matchedRule;
        return row.indexOf(max) - row.indexOf(min);
    });
    return newRow;
});

const middlePageSize = correctedRows.reduce((acc, row) => {
    const middlePage = row[Math.round((row.length - 1) / 2)];
    return acc + middlePage;
}, 0);

console.log({ middlePageSize });
