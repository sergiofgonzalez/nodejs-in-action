/*
  the individual tests in this suite are marked
  with `test.only()` and `fit()` and will be
  forced.
  Regular tests will be implicitly skipped.
*/
describe('a group of tests', () => {
  test.only('first test (forced)', () => {
    expect('string value').toEqual('string value');
  });

  fit('second test (forced)', () => {
    expect('abc').not.toEqual('def');
  })

  test('third test (implicitly skipped)', () => {
    expect(false).toBeFalsy();
  });
});

/*
  this suite if explicitly forced:
  all tests, except the ones marked with 'xit()'
  will be executed
*/
fdescribe('another group of tests (forced)', () => {
  test('another first test', () => {
    expect('string value').toEqual('string value');
  });

  it('another second test', () => {
    expect('abc').not.toEqual('def');
  })

  xit('another third test', () => {
    expect(true).toBeFalsy();
  });
});

/*
  this suite will be implicitly ignored, because
  it does not contain any forced tests
*/
describe('yet another group of tests (implictly skipped)', () => {
  test('yet another first test', () => {
    expect('string value').toEqual('string value');
  });

  it('yet another second test', () => {
    expect('abc').not.toEqual('def');
  })

  it('yet another third test', () => {
    expect(true).toBeFalsy();
  });
});