export class MyClass {
  executeCbAsynchronously(cb: (value: string) => void): void {
    setTimeout(() => {
      cb(`completed!`);
    }, 1000);
  }

  delayedPromise(): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('completed!');
      }, 1000);
    });
  }
}