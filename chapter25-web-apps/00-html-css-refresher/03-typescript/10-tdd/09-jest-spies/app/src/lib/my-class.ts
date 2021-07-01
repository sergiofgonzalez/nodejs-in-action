export class MyClass {
  testFunction(): void {
    console.log(`testFunction() called`);
    this.someOtherFunction();
  }

  someOtherFunction(): void {
    console.log(`someOtherFunction() called`);
  }

  functionReturningValue(): number {
    return 5;
  }
}