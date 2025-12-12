import { Sections, SectionsGroup } from './types';

export function createSectionGroups(sectionList: string): SectionsGroup[] {
    return sectionList.split('\n').map(sectionGroup => {
        return sectionGroup.split(',').map(section => {
            return section.split('-').map(Number) as Sections;
        });
    });
}

export function checkSectionGroupFullyOverlap([
    sectionGroup1,
    sectionGroup2,
]: SectionsGroup): boolean {
    // compare section2 is inside section1 then vis-versa
    return (
        isInsideSection(sectionGroup1, sectionGroup2) ||
        isInsideSection(sectionGroup2, sectionGroup1)
    );
}

export function checkSectionGroupPartialOverlap([
    sectionGroup1,
    sectionGroup2,
]: SectionsGroup): boolean {
    const [first1, first2] = sectionGroup1;
    const [second1, second2] = sectionGroup2;
    // compare any part section2 is inside section1 then vis-versa
    return (
        checkSectionGroupFullyOverlap([sectionGroup1, sectionGroup2]) ||
        isBetween(first1, second1, second2) ||
        isBetween(first2, second1, second2)
    );
}

function isBetween(x: number, min: number, max: number): boolean {
    return x >= min && x <= max;
}

function isInsideSection(
    outsideSection: Sections,
    insideSection: Sections,
): boolean {
    return (
        outsideSection[0] <= insideSection[0] &&
        outsideSection[1] >= insideSection[1]
    );
}

export function countAllFullyOverlappedGroups(input: string) {
    const groups = createSectionGroups(input);
    return groups.reduce((sum, group) => {
        const overlap = checkSectionGroupFullyOverlap(group);
        return sum + (overlap ? 1 : 0);
    }, 0);
}

export function countPartialOverlappedGroups(input: string) {
    const groups = createSectionGroups(input);
    return groups.reduce((sum, group) => {
        const overlap = checkSectionGroupPartialOverlap(group);
        return sum + (overlap ? 1 : 0);
    }, 0);
}
