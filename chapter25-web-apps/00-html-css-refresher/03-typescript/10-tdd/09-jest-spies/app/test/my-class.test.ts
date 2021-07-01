import { MyClass } from '../src/lib/my-class';

describe('Hello, spies!', () => {

  test('should invoke someOtherFunction()', () => {
    const myClassObj = new MyClass();
    const testFunctionSpy = jest.spyOn(
      myClassObj, 'someOtherFunction'
    );

    myClassObj.testFunction();
    expect(testFunctionSpy).toHaveBeenCalled();
  });

  test('should call testFunction()', () => {
    const myClassObj = new MyClass();
    const testFunctionSpy = jest.spyOn(
      myClassObj, 'testFunction'
    ).mockImplementation(() => {
      console.log(`mockImplementation called`);
    });

    myClassObj.testFunction();
    expect(testFunctionSpy).toHaveBeenCalled();
  });


  test('should return value', () => {
    const myClassObj = new MyClass();
    jest.spyOn(
      myClassObj, 'functionReturningValue'
    ).mockImplementation(() => {
      return 10;
    });

    expect(myClassObj.functionReturningValue()).toEqual(10);
  });
});
