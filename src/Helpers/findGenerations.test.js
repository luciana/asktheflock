import findGeneration from './findGeneration';

describe('findGeneration', () => {
  it('returns "The Silent Generation" for birthdates from 1925 to 1945', () => {
    const birthdate = new Date('1930-01-01');
    expect(findGeneration(birthdate)).toBe('The Silent Generation');
  });

  it('returns "The Baby Boomer Generation" for birthdates from 1946 to 1964', () => {
    const birthdate = new Date('1950-01-01');
    expect(findGeneration(birthdate)).toBe('The Baby Boomer Generation');
  });

  it('returns "Generation X" for birthdates from 1965 to 1979', () => {
    const birthdate = new Date('1970-01-01');
    expect(findGeneration(birthdate)).toBe('Generation X');
  });

  it('returns "Millennials" for birthdates from 1980 to 1994', () => {
    const birthdate = new Date('1990-01-01');
    expect(findGeneration(birthdate)).toBe('Millennials');
  });

  it('returns "Generation Z" for birthdates from 1995 to 2012', () => {
    const birthdate = new Date('2000-01-01');
    expect(findGeneration(birthdate)).toBe('Generation Z');
  });

  it('returns "Gen Alpha" for birthdates from 2013 to 2032', () => {
    const birthdate = new Date('2020-01-01');
    expect(findGeneration(birthdate)).toBe('Gen Alpha');
  });

  it('returns "Unknown" for birthdates outside of defined generations', () => {
    const birthdate = new Date('1900-01-01');
    expect(findGeneration(birthdate)).toBe('Unknown');
  });
});
