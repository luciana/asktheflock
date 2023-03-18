import isValidPassword from './isValidPassword';

describe('isValidPassword', () => {
  it('returns true for valid passwords', () => {
    const validPasswords = [
      'P@ssw0rd',
      'aA1!@#$%^&*()',
      't3stP@ssw0rd',
    ];

    validPasswords.forEach((password) => {
      expect(isValidPassword(password)).toBe(true);
    });
  });

  it('returns false for invalid passwords', () => {
    const invalidPasswords = [
      'password',
      'Password',
      'password1',
      'Password1',
      'Password!',
      'password!',
      'abc123!@#',
      'Abc123!',
    ];

    invalidPasswords.forEach((password) => {
      expect(isValidPassword(password)).toBe(false);
    });
  });
});
