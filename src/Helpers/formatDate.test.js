import FormatDate from './FormatDate';

describe('FormatDate', () => {
  it('formats the date correctly for the en-US locale', () => {
    const date = '2022-04-18';
    const locale = 'en-US';
    const formattedDate = FormatDate(date, locale);
    expect(formattedDate).toBe('04/18/2022');
  });

  it('formats the date correctly for the fr-FR locale', () => {
    const date = '2022-04-18';
    const locale = 'fr-FR';
    const formattedDate = FormatDate(date, locale);
    expect(formattedDate).toBe('18/04/2022');
  });

  it('formats the date correctly for the pt-BR locale', () => {
    const date = '2022-04-18';
    const locale = 'pt-BR';
    const formattedDate = FormatDate(date, locale);
    expect(formattedDate).toBe('18/04/2022');
  });
});
