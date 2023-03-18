import formatDateTime from './formatDateTime';

describe('formatDateTime', () => {
  it('formats date and time correctly for Eastern Time', () => {
    const date = '2022-05-15T13:30:00Z';
    const expectedFormattedDate = '5/15/2022 at 01:30 pm (EDT)';
    expect(formatDateTime(date)).toBe(expectedFormattedDate);
  });

  it('formats date and time correctly for Pacific Time', () => {
    const date = '2022-05-15T13:30:00Z';
    const expectedFormattedDate = '5/15/2022 at 10:30 am (PDT)';
    expect(formatDateTime(date, 'America/Los_Angeles')).toBe(expectedFormattedDate);
  });

  it('formats date and time correctly for Paris', () => {
    const date = '2022-05-15T17:30:00Z';
    const expectedFormattedDate = '5/15/2022 at 07:30 pm (CEST)';
    expect(formatDateTime(date, 'Europe/Paris')).toBe(expectedFormattedDate);
  });
  it('formats date and time correctly', () => {
    const date = '2022-05-15T17:30:00Z';
    const expectedFormattedDate = '5/15/2022 at 05:30 pm (EDT)';
    expect(formatDateTime(date)).toBe(expectedFormattedDate);
  });

  it('handles midnight correctly', () => {
    const date = '2022-05-15T00:00:00Z';
    const expectedFormattedDate = '5/15/2022 at 12:00 am (EDT)';
    expect(formatDateTime(date)).toBe(expectedFormattedDate);
  });

  it('handles afternoon correctly', () => {
    const date = '2022-05-15T15:30:00Z';
    const expectedFormattedDate = '5/15/2022 at 03:30 pm (EDT)';
    expect(formatDateTime(date)).toBe(expectedFormattedDate);
  });

});
