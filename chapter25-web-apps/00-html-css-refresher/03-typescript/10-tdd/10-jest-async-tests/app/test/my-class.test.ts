import { MyClass } from '../src/lib/my-class';

describe('Hello, async tests!', () => {
  test('fails: should wait for callback to complete', () => {
    const myClassObj = new MyClass();
    let valueReceivedInCb!: string;
    myClassObj.executeCbAsynchronously((value: string) => {
      valueReceivedInCb = value;
    });
    expect(valueReceivedInCb).toBe('completed!');
  });
});

describe('Hello, async tests with done!', () => {
  let valueReceivedInCb!: string;

  beforeEach((done: jest.DoneCallback) => {
    const myClassObj = new MyClass();
    myClassObj.executeCbAsynchronously((value: string) => {
      valueReceivedInCb = value;
      done();
    });
  });

  test('pass: should wait for callback to complete', () => {
    expect(valueReceivedInCb).toBe('completed!');
  });
});


describe('Hello, async/await tests', () => {

  test('should resolve after some time', async () => {
    const myClassObj = new MyClass();
    const result = await myClassObj.delayedPromise();
    expect(result).toEqual('completed!');
  });
});