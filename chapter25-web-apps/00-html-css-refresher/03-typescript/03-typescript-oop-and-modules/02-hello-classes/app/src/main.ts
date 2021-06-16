/* Hello, class */

class SimpleClass {
  id: number | undefined;
  print(): void {
    console.log(`SimpleClass.print()`);
  }
}

const mySimpleClass = new SimpleClass();
mySimpleClass.print();

/* the `this` keyword */
class SimpleClass1 {
  id: number | undefined;
  print() : void {
    console.log(`SimpleClass1.id:`, this.id);
  }
}

const mySimpleClass1 = new SimpleClass1();
mySimpleClass1.print();

mySimpleClass1.id = 55;
mySimpleClass1.print();

/* Implementing interfaces */

interface IPrint {
  print(): void;
}

class ClassA implements IPrint {
  print(): void {
    console.log(`ClassA.print()`);
  }
}

class ClassB {
  print(): void {
    console.log(`ClassB.print()`);
  }
}


function printClass(a: IPrint) {
  a.print();
}

printClass(new ClassA());   /* Duck Typing */
printClass(new ClassB());   /* Duck Typing */

class ClassC implements IPrint {
  print(): void {
    console.log(`ClassC.print()`);
  }
}

printClass(new ClassC());

/* class constructor */
class ClassWithConstructor {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}

console.log(new ClassWithConstructor(5));

/* Class modifiers: public */
class ClassWithPublicProperty {
  public id: number | undefined;
}

const publicAccessObj = new ClassWithPublicProperty();
publicAccessObj.id = 55;

/* Class modifiers: private */
class ClassWithPrivateProperty {
  private id: number;
  constructor(id: number) {
    this.id = id;
  }
}

const privateAccessObj = new ClassWithPrivateProperty(44);
// privateAccessObj.id = 55; /* ERROR: private field */

/* Constructor parameter properties */

class ClassWithCtorMods {
  constructor(public id: number, private name: string) {}
}

const myClassWithCtorMods = new ClassWithCtorMods(55, 'Jason Isaacs');
console.log(myClassWithCtorMods);
myClassWithCtorMods.id = 88;
// myClassWithCtorMods.name = 'Idris Elba'; // ERROR: private property
console.log(myClassWithCtorMods);

/* readonly */

class ClassWithReadOnly {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }

  /* ERROR: cannot assign to readonly outside the constructor
  setName(name: string) {
    this.name = name;
  }
  */
}

/* setters and getters */
class ClassWithAccessors {
  private _id: number = 0;

  get id(): number {
    console.log(`id property was accessed through the getter`);
    return this._id;
  }

  set id(value: number) {
    console.log(`id property was written through the setter`);
    this._id = value;
  }
}

const classWithAccessors = new ClassWithAccessors();
console.log(classWithAccessors);
classWithAccessors.id = 55;
console.log(classWithAccessors.id);

/* static functions */
class ClassWithStaticFunction {
  static sayHello(name: string = 'stranger'): void {
    console.log(`Hello, ${name}!`);
  }
}

ClassWithStaticFunction.sayHello('Jason Isaacs');

/* static properties */
class ClassWithStaticProp {
  static count: number = 0;
  constructor() {
    ClassWithStaticProp.count++;
  }
}

console.log(ClassWithStaticProp.count);
for (let i = 0; i < 10; i++) {
  new ClassWithStaticProp();
}
console.log(ClassWithStaticProp.count);

/* namespaces */
namespace MyNamespace1 {
  export class MyNamespaceClass { }
  class NotExportedClass { }
}

namespace MyNamespace2 {
  export class MyNamespaceClass { }
  class NotExportedClass { }
}

const namespace1Class = new MyNamespace1.MyNamespaceClass();
const namespace2Class = new MyNamespace2.MyNamespaceClass();

// const notExportedClass = new MyNamespace1.NotExportedClass(); // does not exist!