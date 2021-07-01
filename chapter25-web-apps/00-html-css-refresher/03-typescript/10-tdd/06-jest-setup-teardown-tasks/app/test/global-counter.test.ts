import { GlobalCounter } from '../src/lib/global-counter';

describe('GlobalCounter Test Suite with test setup and teardown', () => {
  let globalCounter: GlobalCounter;

  beforeAll(() => {
    globalCounter = new GlobalCounter();
  });

  afterAll(() => {
    console.log(`test suite completed`);
  });

  beforeEach(() => {
    globalCounter.count = 0;
  });

  afterEach(() => {
    console.log(`globalCounter count after test was: `, globalCounter.count);
  });

  test('should increment', () => {
    globalCounter.increment();
    expect(globalCounter.count).toBe(1);
  });

  test('should increment twice', () => {
    globalCounter.increment();
    globalCounter.increment();
    expect(globalCounter.count).toBe(2);
  });
});