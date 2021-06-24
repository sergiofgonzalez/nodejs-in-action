class MyBoundClass {
  name = 'defaultNameValue';

  printName(index: number, description: string) {
    console.log(`this.name:`, this.name);
    console.log(`index:`, index);
    console.log(`description:`, description);
  }
}

const myObj = new MyBoundClass();
myObj.printName(1, 'Hello!');

/* call */

// correctly typed params
myObj.printName.call({ name: 'overridden name with call' }, 55, 'foo!');

// incorrectly typed params
//myObj.printName.call({ name: 'overridden name' }, 'bar', 'foo!');


/* apply */
// correctly typed params
myObj.printName.apply({ name: 'overridden name with apply' }, [88, 'bar!']);

// incorrectly typed params
//myObj.printName.apply({ name: 'overridden name with apply' }, [88, false]);

/* bind */

// correctly typed params
const boundThis = { name: 'overridden for bind' };
const boundPrintNameFn = myObj.printName.bind(boundThis, 25, 'foobar!');
boundPrintNameFn();

// incorrectly typed params
const boundThisErr = { id: 5 };
const boundPrintNameErrFn = myObj.printName.bind(boundThisErr, 25, 'foobar!');
boundPrintNameErrFn();

