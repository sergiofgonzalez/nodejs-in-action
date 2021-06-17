"use strict";
/* Interface inheritance */
class IdNameClass {
    constructor() {
        this.name = 'Jason Isaacs';
        this.id = 1;
    }
}
class IdClass {
    constructor() {
        this.id = 5;
    }
}
const multiObject = {
    id: 1,
    name: 'Jason Isaacs',
    description: 'a fine actor'
};
/* Class inheritance */
class BaseClass {
    constructor() {
        this.id = 0;
    }
}
class DerivedFromBaseClass extends BaseClass {
    constructor() {
        super(...arguments);
        this.name = 'Jason Isaacs';
    }
}
const derivedFromBaseClassObj = new DerivedFromBaseClass();
console.log(derivedFromBaseClassObj);
class MultipleInterfaces {
    constructor() {
        this.id = 0;
        this.name = 'Idris Elba';
    }
}
/* The `super()` function */
// with constructors
class BaseClassWithCtor {
    constructor(id) {
        this.id = id;
    }
}
class DerivedClassWithCtor extends BaseClassWithCtor {
    constructor(id, name) {
        super(id);
        this.name = name;
    }
}
/* Function overriding */
class BaseClassWithFn {
    print(text) {
        console.log(`BaseClassWithFn.print(): ${text}`);
    }
}
class DerivedClassWithFnOverride extends BaseClassWithFn {
    print(text) {
        console.log(`DerivedClassWithFnOverride.print(): ${text}`);
    }
}
const derivedClassWithFnOverrideObj = new DerivedClassWithFnOverride();
derivedClassWithFnOverrideObj.print('hello!');
// Delegation using super
class DerivedClassWithFnDelegation extends BaseClassWithFn {
    print(text) {
        super.print(`from DerivedClassWithFnDelegation: ${text}`);
    }
}
const derivedClassWithFnDelegationObj = new DerivedClassWithFnDelegation();
derivedClassWithFnDelegationObj.print('hello!');
/* Protected */
class BaseClassProtected {
    constructor(id) {
        this.name = '';
        this.id = id;
    }
}
class AccessProtected extends BaseClassProtected {
    constructor(id) {
        super(id);
        console.log(`this.id =`, this.id);
        // console.log(`this.name =`, this.name); // Error: 'name' is private
    }
}
const accessProtectedObj = new AccessProtected(55);
// console.log(accessProtectedObj.id);     // ERROR: protected
// console.log(accessProtectedObj.name);   // ERROR: private
/* Abstract classes */
class EmployeeBase {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
class OfficeWorker extends EmployeeBase {
}
class OfficeManager extends OfficeWorker {
    constructor() {
        super(...arguments);
        this.directReports = [];
    }
}
const jack = new OfficeWorker(1, 'Jack');
const jill = new OfficeWorker(2, 'Jill');
const chris = new OfficeManager(3, 'Chris');
/* Abstract methods */
class EmployeeBase1 {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
class OfficeWorker1 extends EmployeeBase1 {
    doWork() {
        console.log(`${this.name}: doing some work!`);
    }
}
class OfficeManager1 extends OfficeWorker1 {
    constructor() {
        super(...arguments);
        this.directReports = [];
    }
    manageEmployees() {
        super.doWork(); // manager working
        for (const directReport of this.directReports) {
            directReport.doWork();
        }
    }
}
const alice = new OfficeWorker1(1, 'Alice');
const bob = new OfficeWorker1(2, 'Bob');
const charlie = new OfficeManager1(3, 'Charlie');
charlie.directReports.push(alice, bob);
charlie.manageEmployees();
/* instanceof */
class A {
}
class BfromA extends A {
}
class CfromA extends A {
}
class DfromC extends CfromA {
}
console.log(`A instance of A          :`, new A() instanceof A);
console.log(`BfromA instance of A     :`, new BfromA() instanceof A);
console.log(`BfromA instance of BfromA:`, new BfromA() instanceof BfromA);
console.log(`CFromA instance of BFromA:`, new CfromA() instanceof BfromA);
console.log(`DfromC instance of CfromA:`, new DfromC() instanceof CfromA);
console.log(`DfromC instance of A     :`, new DfromC() instanceof A);
//# sourceMappingURL=main.js.map