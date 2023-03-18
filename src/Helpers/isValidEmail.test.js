import isValidEmail from './isValidEmail';

describe('isValidEmail', () => {
    it('returns true for valid email addresses', () => {
        const validEmails = [
            'test@example.com',
            'test+123@example.com',
            'test.123@example.com',
            'test_123@example.com',
            'TEST@example.com',
            'test@example.co.uk',
            'test@example-123.com',
        ];

        validEmails.forEach((email) => {
            expect(isValidEmail(email)).toBe(true);
        });
    });

    it('returns false for invalid email addresses', () => {
        const invalidEmails = [
            'test',
            'test@',
            'test@example',
            'test@.com',
            'test@example.',
            'test@example..com',
            'test@ example.com',
            'test@example.com.',
        ];

        invalidEmails.forEach((email) => {
            expect(isValidEmail(email)).toBe(false);
        });
    });
});
