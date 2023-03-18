import formatName from './formatName';

describe('formatName', () => {
  it('returns the original name if the name length is less than the maxChars', () => {
    const name = 'John';
    const maxChars = 10;
    const formattedName = formatName(name, maxChars);
    expect(formattedName).toBe('John');
  });

  it('returns the original name if the name length is equal to the maxChars', () => {
    const name = 'John Smith';
    const maxChars = 10;
    const formattedName = formatName(name, maxChars);
    expect(formattedName).toBe('John Smith');
  });

  it('returns the truncated name with ellipsis if the name length is greater than the maxChars', () => {
    const name = 'Johnathan Smith';
    const maxChars = 10;
    const formattedName = formatName(name, maxChars);
    expect(formattedName).toBe('Johnath...');
  });
});
