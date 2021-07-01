/* this test suite is using `it` which is an alias of test */

describe.skip('toStrictEqual matcher test suite', () => {

  test('failed test with numbers', () => {
    expect(1).toStrictEqual(2);
  });

  it('passed test with numbers', () => {
    expect(5).toStrictEqual(5);
  });

  it('passed: toStrictEqual checks for properties strict equality', () => {
    const obj1 = { id: 1, person: { name: 'Jason Isaacs', age: 53, villain: true } };
    const obj1Ref = obj1;
    expect(obj1).toEqual(obj1Ref);
  });

  it('pass: toStricEqual checks for properties strict equality', () => {
    const obj1 = { id: 1, person: { name: 'Jason Isaacs', age: 53, villain: true } };
    const obj2 = { id: 1, person: { name: 'Jason Isaacs', age: 53, villain: true } };
    expect(obj1).toEqual(obj2);
  });

  it('failed: toStricEqual checks for properties strict equality', () => {
    const obj1 = { id: 1, person: { name: 'Jason Isaacs', age: 53, villain: true } };
    const obj2 = { id: 1, person: { name: 'Jason Isaacs', age: 53, villain: 1 } };
    expect(obj1).toEqual(obj2);
  });
});