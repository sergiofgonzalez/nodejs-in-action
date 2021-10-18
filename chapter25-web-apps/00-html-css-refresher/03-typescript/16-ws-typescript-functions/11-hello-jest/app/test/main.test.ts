import { capitalize } from '../src/main';

describe(`test suite for 'sentence'`, () => {
  test(`capitalize`, () => {
    expect(capitalize('HELLO')).toBe('Hello');
  });
});