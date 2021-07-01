/* this test suite is using `it` which is an alias of test */

describe.skip('toEqual matcher test suite', () => {

  it('failed: test with numbers', () => {
    expect(1).toEqual(2);
  });

  it('passed: test with numbers', () => {
    expect(5).toEqual(5);
  });

  it('passed: toEqual checks for properties equality', () => {
    const obj1 = { id: 1, person: { name: 'Jason Isaacs', age: 53 } };
    const obj1Ref = obj1;
    expect(obj1).toEqual(obj1Ref);
  });

  it('passed: toEqual checks for properties equality', () => {
    const obj1 = { id: 1, person: { name: 'Jason Isaacs', age: 53 } };
    const obj2 = { id: 1, person: { name: 'Jason Isaacs', age: 53 } };
    expect(obj1).toEqual(obj2);
  });

  it('failed: toEqual checks for properties equality', () => {
    /*
      this fails thanks to TypeScript type system: would pass in JS as:
      console.log(true == 1); // -> true in JS
    */
    const obj1 = { id: 1, person: { name: 'Jason Isaacs', age: 53, villain: true } };
    const obj2 = { id: 1, person: { name: 'Jason Isaacs', age: 53, villain: 1 } };
    expect(obj1).toEqual(obj2);
  });
});