import { MyClass } from '../src/lib/my-class';

describe('Hello, mocks!', () => {

  test('should invoke callback', () => {
    const mock = jest.fn();

    const myClassObj = new MyClass();
    myClassObj.executeCb('test', mock);

    expect(mock).toHaveBeenCalled();
  });


  test('should invoke callback with given args', () => {
    const mock = jest.fn();

    const myClassObj = new MyClass();
    myClassObj.executeCb('arg-value', mock);

    expect(mock).toHaveBeenCalledWith('arg-value');
  });

});
