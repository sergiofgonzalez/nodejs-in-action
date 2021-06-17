/* Interface inheritance */

interface IBase {
  id: number;
}

interface IDerivedFromBase extends IBase {
  name: string;
}

class IdNameClass implements IDerivedFromBase {
  name: string = 'Jason Isaacs';
  id: number = 1;
}

// Narrowing down the type
interface IBaseStringOrNumber {
  id: string | number;
}

interface IDerivedFromBaseNumber extends IBaseStringOrNumber {
  id: number;
}

class IdClass implements IDerivedFromBaseNumber {
  id: number = 5;
}

// multiple inheritance
interface IMultiple extends IDerivedFromBase, IDerivedFromBaseNumber {
  description: string;
}

const multiObject: IMultiple = {
  id: 1,
  name: 'Jason Isaacs',
  description: 'a fine actor'
};

/* Class inheritance */
class BaseClass implements IBase {
  id: number = 0;
}

class DerivedFromBaseClass extends BaseClass implements IDerivedFromBase {
  name: string = 'Jason Isaacs';
}

const derivedFromBaseClassObj = new DerivedFromBaseClass();
console.log(derivedFromBaseClassObj);


// implementing multiple interfaces
interface IFirstInterface {
  id: number;
}

interface ISecondInterface {
  name: string;
}

class MultipleInterfaces implements IFirstInterface, ISecondInterface {
  id = 0;
  name = 'Idris Elba';
}

/* The `super()` function */

// with constructors
class BaseClassWithCtor {
  private id: number;
  constructor(id: number) {
    this.id = id;
  }
}

class DerivedClassWithCtor extends BaseClassWithCtor {
  private name: string;
  constructor(id: number, name: string) {
    super(id);
    this.name = name;
  }
}

/* Function overriding */
class BaseClassWithFn {
  print(text: string): void {
    console.log(`BaseClassWithFn.print(): ${text}`);
  }
}

class DerivedClassWithFnOverride extends BaseClassWithFn {
  print(text: string): void {
    console.log(`DerivedClassWithFnOverride.print(): ${text}`);
  }
}

const derivedClassWithFnOverrideObj = new DerivedClassWithFnOverride();
derivedClassWithFnOverrideObj.print('hello!');

// Delegation using super

class DerivedClassWithFnDelegation extends BaseClassWithFn {
  print(text: string): void {
    super.print(`from DerivedClassWithFnDelegation: ${text}`)
  }
}

const derivedClassWithFnDelegationObj = new DerivedClassWithFnDelegation();
derivedClassWithFnDelegationObj.print('hello!');

/* Protected */
class BaseClassProtected {
  protected id: number;
  private name: string = '';
  constructor(id: number) {
    this.id = id;
  }
}

class AccessProtected extends BaseClassProtected {
  constructor(id: number) {
    super(id);
    console.log(`this.id =`, this.id);
    // console.log(`this.name =`, this.name); // Error: 'name' is private
  }
}

const accessProtectedObj = new AccessProtected(55);
// console.log(accessProtectedObj.id);     // ERROR: protected
// console.log(accessProtectedObj.name);   // ERROR: private

/* Abstract classes */
abstract class EmployeeBase {
  public id: number;
  public name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class OfficeWorker extends EmployeeBase {}
class OfficeManager extends OfficeWorker {
  public directReports: OfficeWorker[] = [];
}

const jack = new OfficeWorker(1, 'Jack');
const jill = new OfficeWorker(2, 'Jill');
const chris = new OfficeManager(3, 'Chris');

/* Abstract methods */

abstract class EmployeeBase1 {
  public id: number;
  public name: string;
  abstract doWork(): void;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class OfficeWorker1 extends EmployeeBase1 {
  doWork(): void {
    console.log(`${this.name}: doing some work!`);
  }
}

class OfficeManager1 extends OfficeWorker1 {
  public directReports: OfficeWorker1[] = [];

  manageEmployees(): void {
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

class A { }
class BfromA extends A { }
class CfromA extends A { }
class DfromC extends CfromA { }

console.log(`A instance of A          :`, new A() instanceof A);
console.log(`BfromA instance of A     :`, new BfromA() instanceof A);
console.log(`BfromA instance of BfromA:`, new BfromA() instanceof BfromA);
console.log(`CFromA instance of BFromA:`, new CfromA() instanceof BfromA);
console.log(`DfromC instance of CfromA:`, new DfromC() instanceof CfromA);
console.log(`DfromC instance of A     :`, new DfromC() instanceof A);

/* Interfaces deriving from classes */
class BaseInterfaceClass {
  id: number = 0;
  print() {
    console.log(`this.id = ${this.id}`);
  }
}

interface IBaseInterfaceClassExt extends BaseInterfaceClass {
  setId(id: number): void;
}

class ImplementsExt implements IBaseInterfaceClassExt {
  setId(id: number): void {
    throw new Error("Method not implemented.");
  }
  /* required to conform to the interface */
  id: number = 0;
  print(): void {
    throw new Error("Method not implemented.");
  }
}

// however it is better to extend and implement
class ImplementsExt1 extends BaseInterfaceClass implements IBaseInterfaceClassExt {
  setId(id: number): void {
    this.id = id;
  }
}
