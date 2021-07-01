describe('toThrowError test suite', () => {

  test('pass: should throw specific error', () => {
    expect(() => {
      throw new Error('fabricated error');
    }).toThrowError(new Error('fabricated error'));
  });

  test('pass: should throw any error', () => {
    expect(() => {
      throw new Error('fabricated error');
    }).toThrowError();
  });

  test('fail: should throw specific error', () => {
    expect(() => {
      throw new Error('fabricated error');
    }).toThrowError(new Error('Another fabricated error'));
  });

  test('fail: should throw error', () => {
    expect(() => {
      /* ...no error... */
    }).toThrowError();
  });

});