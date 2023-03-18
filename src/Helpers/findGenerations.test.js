import findGeneration from './findGeneration';
import { GENERATIONS } from '../Constants';

describe('findGeneration', () => {
  it('returns the correct generation label for a given birthdate', () => {
    const birthdates = [
      new Date('1925-01-01'),
      new Date('1945-01-01'),
      new Date('1965-01-01'),
      new Date('1980-01-01'),
      new Date('1995-01-01'),
      new Date('2010-01-01'),
    ];

    const expectedGenerations = [
      'Greatest',
      'Silent',
      'Boomer',
      'Gen X',
      'Millennial',
      'Gen Z',
    ];

    birthdates.forEach((birthdate, index) => {
      const generation = findGeneration(birthdate);
      expect(generation).toBe(expectedGenerations[index]);
    });
  });

  it('returns null for an invalid birthdate', () => {
    const birthdate = new Date('Invalid date');
    const generation = findGeneration(birthdate);
    expect(generation).toBeNull();
  });

  it('returns the correct generation label based on GENERATIONS constant', () => {
    GENERATIONS.forEach((generation) => {
      const birthdate = new Date((generation.start + generation.end) / 2);
      const label = findGeneration(birthdate);
      expect(label).toBe(generation.label);
    });
  });
});
