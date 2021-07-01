/* this one is using describe and test, which seems to be Jest default */

describe.skip('toBe matcher test suite', () => {

  test('failed test with numbers', () => {
    expect(1).toBe(2);
  });

  test('passed test with numbers', () => {
    expect(5).toBe(5);
  });

  test('passed: toBe checks for object equality', () => {
    const obj1 = { id: 1 };
    const obj1Ref = obj1;
    expect(obj1).toBe(obj1Ref);
  });

  test('failed: toBe checks for object equality', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 1 };
    expect(obj1).toBe(obj2);
  });
});