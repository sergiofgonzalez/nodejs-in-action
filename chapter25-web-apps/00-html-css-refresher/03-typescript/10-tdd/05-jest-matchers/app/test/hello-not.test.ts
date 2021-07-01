describe.skip('not test suite', () => {

  test('pass: test with numbers', () => {
    expect(1).not.toBe(2);
  });


  test('pass: list does not contains an item (object shape)', () => {
    const list = [ { id: 1 }, { id: 2 } ];
    expect(list).not.toContainEqual({ id: 3 });
  });

  test('pass: should not throw any error', () => {
    expect(() => {
      /* ...no error... */
    }).not.toThrowError();
  });

});