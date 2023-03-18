import findAge from './findAge';

describe('findAge', () => {
  it('returns the correct age for a given birthdate', () => {
    const birthdate1 = '2000-01-01';
    const birthdate2 = '1990-03-18';
    const birthdate3 = '1985-12-31';

    const age1 = findAge(birthdate1);
    const age2 = findAge(birthdate2);
    const age3 = findAge(birthdate3);

    const today = new Date();
    const expectedAge1 = today.getFullYear() - 2000 - (today.getMonth() >= 1 || (today.getMonth() === 0 && today.getDate() >= 1) ? 0 : 1);
    const expectedAge2 = today.getFullYear() - 1990 - (today.getMonth() > 3 || (today.getMonth() === 2 && today.getDate() >= 18) ? 0 : 1);
    const expectedAge3 = today.getFullYear() - 1985 - (today.getMonth() >= 12 || (today.getMonth() === 11 && today.getDate() >= 31) ? 0 : 1);

    expect(age1).toBe(expectedAge1);
    expect(age2).toBe(expectedAge2);
    expect(age3).toBe(expectedAge3);
  });

  it('returns the correct age for a birthdate with the same day and month as today', () => {
    const today = new Date();
    const birthdate = `${today.getFullYear() - 25}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    const age = findAge(birthdate);
    expect(age).toBe(25);
  });
});
