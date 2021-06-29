
describe('a group of tests', () => {
  test('first test', () => {
    expect('string value').toEqual('string value');
  });

  test('second test', () => {
    expect('abc').not.toEqual('def');
  })
});