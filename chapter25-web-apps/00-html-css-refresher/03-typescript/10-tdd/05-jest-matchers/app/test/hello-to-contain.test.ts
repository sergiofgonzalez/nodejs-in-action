describe.skip('toContain* test suite', () => {

  test('pass: contains a string', () => {
    expect('abcdef').toContain('cde');
  });

  test('pass: list contains an item (object equality)', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const list = [ obj1, obj2 ];
    expect(list).toContain(obj1);
  });

  test('fail: list contains an item (object shape)', () => {
    const list = [ { id: 1 }, { id: 2 } ];
    expect(list).toContain({ id: 1 });
  });

  test('pass: list contains an item (object shape)', () => {
    const list = [ { id: 1 }, { id: 2 } ];
    expect(list).toContainEqual({ id: 1 });
  });


  test('fail: list contains an item (object shape)', () => {
    const list = [ { id: 1 }, { id: 2 } ];
    expect(list).toContainEqual({ id: 3 });
  });

});