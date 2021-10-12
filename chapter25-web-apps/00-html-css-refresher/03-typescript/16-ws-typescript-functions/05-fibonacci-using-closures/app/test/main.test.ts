import { countWords, isAlpha, isBlank, repeat, toTitleCase, toWords } from '../src/main';

describe('toTitleCase suite', () => {

  test('function should be defined', () => {
    expect(toTitleCase).not.toBeFalsy();
  });

  test('should correctly capitalize war AND peace', () => {
    expect(toTitleCase('war AND peace')).toBe('War And Peace');
  });

  test('should correctly capitalize Catcher in the Rye', () => {
    expect(toTitleCase('Catcher in the Rye')).toBe('Catcher In The Rye');
  });

  test('should correctly capitalize tO kILL A mOCKINGBIRD', () => {
    expect(toTitleCase('tO kILL A mOCKINGBIRD')).toBe('To Kill A Mockingbird');
  });

  test('should do nothing with empty string', () => {
    expect(toTitleCase('')).toBe('');
  });

  test('should do nothing with numeric string', () => {
    expect(toTitleCase('1234')).toBe('1234');
  });

  test('should do proper casing with single word', () => {
    expect(toTitleCase('jason')).toBe('Jason');
  });

  test('should do nothing with string with no words', () => {
    expect(toTitleCase('\n')).toBe('\n');
  });
});

describe('countWords suite', () => {

  test('function should be defined', () => {
    expect(countWords).not.toBeFalsy();
  });

  test('should correctly count War and Peace', () => {
    expect(countWords('War and Peace')).toBe(3);
  });

  test('should correctly count catcher-in-the-rye', () => {
    expect(countWords('catcher-in-the-rye')).toBe(4);
  });

  test('should correctly count for_whom the-bell-tolls', () => {
    expect(countWords('for_whom the-bell-tolls')).toBe(5);
  });

  test('should return 0 for empty string', () => {
    expect(countWords('')).toBe(0);
  });

  test('should return 1 for string with single word', () => {
    expect(countWords('Hello')).toBe(1);
  });
});


describe(`toWords suite`, () => {

  test(`function should be defined`, () => {
    expect(toWords).toBeTruthy();
  });

  test(`should return the words for 'War and Peace'`, () => {
    expect(toWords('War and Peace')).toStrictEqual(['War', 'and', 'Peace']);
  });

  test(`should return the words for 'catcher-in-the-rye'`, () => {
    expect(toWords('catcher-in-the-rye')).toStrictEqual(['catcher', 'in', 'the', 'rye']);
  });

  test(`should return the words for 'for_whom the-bell-tolls'`, () => {
    expect(toWords('for_whom the-bell-tolls')).toStrictEqual(['for', 'whom', 'the', 'bell', 'tolls']);
  });

  test('should return empty array for empty string', () => {
    expect(toWords('')).toStrictEqual([]);
  });
});

describe(`repeat suite`, () => {

  test(`function should be defined`, () => {
    expect(repeat).toBeTruthy();
  });

  test(`should return 'WarWarWar'`, () => {
    expect(repeat('War', 3)).toBe('WarWarWar');
  });

  test(`should return 'rye'`, () => {
    expect(repeat('rye', 1)).toBe('rye');
  });

  test(`should return ''`, () => {
    expect(repeat('bell', 0)).toBe('');
  });
});

describe(`isAlpha suite`, () => {

  test(`function should be defined`, () => {
    expect(isAlpha).toBeTruthy();
  });

  test(`should return false for 'War and Peace'`, () => {
    expect(isAlpha('War and Peace')).toBe(false);
  });


  test(`should return true for 'Atonement'`, () => {
    expect(isAlpha('Atonement')).toBe(true);
  });

  test(`should return false for '1Q84'`, () => {
    expect(isAlpha('1Q84')).toBe(false);
  });

});

describe(`isAlpha suite`, () => {

  test(`function should be defined`, () => {
    expect(isAlpha).toBeTruthy();
  });

  test(`should return false for 'War and Peace'`, () => {
    expect(isAlpha('War and Peace')).toBe(false);
  });


  test(`should return true for 'Atonement'`, () => {
    expect(isAlpha('Atonement')).toBe(true);
  });

  test(`should return false for '1Q84'`, () => {
    expect(isAlpha('1Q84')).toBe(false);
  });

});

describe(`isBlank suite`, () => {

  test(`function should be defined`, () => {
    expect(isBlank).toBeTruthy();
  });

  test(`should return false for 'War and Peace'`, () => {
    expect(isBlank('War and Peace')).toBe(false);
  });


  test(`should return true for '        '`, () => {
    expect(isBlank('        ')).toBe(true);
  });

  test(`should return true for ''`, () => {
    expect(isBlank('')).toBe(true);
  });

});
