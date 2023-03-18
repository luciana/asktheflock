import FormatDate from './formatDate';

describe('FormatDate', () => {
  describe('Show', () => {
    it('returns the correct formatted date for pt-BR locale', () => {
      const date = '2021-03-18';
      const locale = 'pt-BR';
      const formattedDate = FormatDate.Show(date, locale);
      expect(formattedDate).toBe('18/03/2021');
    });

    it('returns the correct formatted date for other locales', () => {
      const date = '2021-03-18';
      const locale = 'en-US';
      const formattedDate = FormatDate.Show(date, locale);
      expect(formattedDate).toBe('2021-03-18');
    });
  });

  describe('Format', () => {
    it('returns the correctly formatted date for pt-BR locale', () => {
      const date = '18032021';
      const locale = 'pt-BR';
      const formattedDate = FormatDate.Format(date, locale);
      expect(formattedDate).toBe('18/03/2021');
    });

    it('returns the correctly formatted date for other locales', () => {
      const date = '20210318';
      const locale = 'en-US';
      const formattedDate = FormatDate.Format(date, locale);
      expect(formattedDate).toBe('2021-03-18');
    });

    it('returns the original date if input is not provided', () => {
      const date = null;
      const locale = 'en-US';
      const formattedDate = FormatDate.Format(date, locale);
      expect(formattedDate).toBeNull();
    });
  });
});
