export class MyClass {
  executeCb(value: string, cb: (value: string) => null): void {
    console.log(`executeCb: invoking callback`);
    cb(value);
  }
}