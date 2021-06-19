import { perfCounter } from './lib/perf-counter';


class MyClass {
  @perfCounter
  add(a: number, b: number): number {
    return a + b;
  }

  @perfCounter
  async slowAdd(a: number, b: number): Promise<number> {
    const p = new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(this.add(a, b));
      }, 5000);
    });
    const result = await p;
    console.log('done');
    return result;
  }
}

const obj = new MyClass();
obj.add(2, 3);
obj.slowAdd(2, 3);