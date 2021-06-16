"use strict";
/* Hello, class */
class SimpleClass {
    print() {
        console.log(`SimpleClass.print()`);
    }
}
const mySimpleClass = new SimpleClass();
mySimpleClass.print();
/* the `this` keyword */
class SimpleClass1 {
    print() {
        console.log(`SimpleClass1.id:`, this.id);
    }
}
const mySimpleClass1 = new SimpleClass1();
mySimpleClass1.print();
mySimpleClass1.id = 55;
mySimpleClass1.print();
class ClassA {
    print() {
        console.log(`ClassA.print()`);
    }
}
class ClassB {
    print() {
        console.log(`ClassB.print()`);
    }
}
function printClass(a) {
    a.print();
}
printClass(new ClassA()); /* Duck Typing */
printClass(new ClassB()); /* Duck Typing */
class ClassC {
    print() {
        console.log(`ClassC.print()`);
    }
}
printClass(new ClassC());
/* class constructor */
class ClassWithConstructor {
    constructor(id) {
        this.id = id;
    }
}
console.log(new ClassWithConstructor(5));
/* Class modifiers: public */
class ClassWithPublicProperty {
}
const publicAccessObj = new ClassWithPublicProperty();
publicAccessObj.id = 55;
/* Class modifiers: private */
class ClassWithPrivateProperty {
    constructor(id) {
        this.id = id;
    }
}
const privateAccessObj = new ClassWithPrivateProperty(44);
// privateAccessObj.id = 55; /* ERROR: private field */
/* Constructor parameter properties */
class ClassWithCtorMods {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
const myClassWithCtorMods = new ClassWithCtorMods(55, 'Jason Isaacs');
console.log(myClassWithCtorMods);
myClassWithCtorMods.id = 88;
// myClassWithCtorMods.name = 'Idris Elba'; // ERROR: private property
console.log(myClassWithCtorMods);
/* readonly */
class ClassWithReadOnly {
    constructor(name) {
        this.name = name;
    }
}
/* setters and getters */
class ClassWithAccessors {
    constructor() {
        this._id = 0;
    }
    get id() {
        console.log(`id property was accessed through the getter`);
        return this._id;
    }
    set id(value) {
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
    static sayHello(name = 'stranger') {
        console.log(`Hello, ${name}!`);
    }
}
ClassWithStaticFunction.sayHello('Jason Isaacs');
/* static properties */
class ClassWithStaticProp {
    constructor() {
        ClassWithStaticProp.count++;
    }
}
ClassWithStaticProp.count = 0;
console.log(ClassWithStaticProp.count);
for (let i = 0; i < 10; i++) {
    new ClassWithStaticProp();
}
console.log(ClassWithStaticProp.count);
//# sourceMappingURL=main.js.map