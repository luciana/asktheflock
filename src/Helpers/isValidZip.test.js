import isValidZip from './isValidZip';

describe('isValidZip', () => {
    it('returns true for valid US zip codes', () => {
        const validZipCodes = ['12345', '12345-6789'];

        validZipCodes.forEach((zip) => {
            expect(isValidZip(zip, 'en_US')).toBe(true);
        });
    });

    it('returns false for invalid US zip codes', () => {
        const invalidZipCodes = ['1234', '123456', '12-345', '12345-678'];

        invalidZipCodes.forEach((zip) => {
            expect(isValidZip(zip, 'en_US')).toBe(false);
        });
    });

    it('returns true for valid Brazilian zip codes', () => {
        const validZipCodes = ['12345-678', '12345678'];

        validZipCodes.forEach((zip) => {
            expect(isValidZip(zip, 'pt_BR')).toBe(true);
        });
    });

    it('returns false for invalid Brazilian zip codes', () => {
        const invalidZipCodes = ['1234-567', '12345-67', '12345', '123456789'];

        invalidZipCodes.forEach((zip) => {
            expect(isValidZip(zip, 'pt_BR')).toBe(false);
        });
    });

    it('returns true for empty zip codes', () => {
        expect(isValidZip('', 'en_US')).toBe(true);
        expect(isValidZip('', 'pt_BR')).toBe(true);
    });
});
