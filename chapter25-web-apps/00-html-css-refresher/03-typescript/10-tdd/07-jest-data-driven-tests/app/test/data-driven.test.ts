import { isNotEmptyString } from '../src/lib/is-not-empty-string';

describe('Hello, data driven test suite', () => {

  /* hello, data driven tests */
  [1, 2, 3, 4, 5].forEach((value: number) => {
    test(`${ value } must be less than 5`, () => {
      expect(value).toBeLessThan(5);
    });
  });

});

describe('Hello multiple data driven test cases', () => {

  // we create some generic utility function
  // eslint-disable-next-line @typescript-eslint/ban-types
  function testUsing<T>(values: T[], func: Function) {
    for (const value of values) {
      func.apply(Object, [value]);
    }
  }

  testUsing([
    [ undefined, false ],
    [ null, false ],
    [ ' ', false ],
    [ '  ', false ],
    [ ' a ', true ],
    ['a', true ],
    ['a ', true ],
    [' a', true]
  ], ([value, expectedFuncRetValue]: [string, boolean]) => {
    test(`"${ value }" is not empty string should be ${ expectedFuncRetValue }`, () => {
      expectedFuncRetValue ?
        expect(isNotEmptyString(value)).toBeTruthy() :
        expect(isNotEmptyString(value)).toBeFalsy();
    });
  });
});
