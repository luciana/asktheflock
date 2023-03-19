import findStateFromZip from './findStateFromZip';

describe('findStateFromZip', () => {
  it('should return false for an invalid zip code', () => {
    expect(findStateFromZip('1234')).toBe(false);
  });

  it('should return the correct state for a valid zip code', () => {
    expect(findStateFromZip('90210')).toEqual({ code: 'CA', long: 'California' });
    expect(findStateFromZip('10001')).toEqual({ code: 'NY', long: 'New York' });
    expect(findStateFromZip('77002')).toEqual({ code: 'TX', long: 'Texas' });
    expect(findStateFromZip('98101')).toEqual({ code: 'WA', long: 'Washington' });
  });
});
