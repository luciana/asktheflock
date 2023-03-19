import { inBoth, inFirstOnly, inSecondOnly } from './arrayComparison';

const list1 = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
];

const list2 = [
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'David' },
];

describe('arrayComparison', () => {
    describe('inBoth', () => {
        it('should return the intersection of two arrays', () => {
            const result = inBoth(list1, list2);
            expect(result).toEqual([
                { id: 2, name: 'Bob' },
                { id: 3, name: 'Charlie' },
            ]);
        });
    });

    describe('inFirstOnly', () => {
        it('should return the difference of two arrays (elements in the first array but not in the second)', () => {
            const result = inFirstOnly(list1, list2);
            expect(result).toEqual([{ id: 1, name: 'Alice' }]);
        });
    });

    describe('inSecondOnly', () => {
        it('should return the difference of two arrays (elements in the second array but not in the first)', () => {
            const result = inSecondOnly(list1, list2);
            expect(result).toEqual([{ id: 4, name: 'David' }]);
        });
    });
});
