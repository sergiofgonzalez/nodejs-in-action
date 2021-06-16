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
console.log(accessProtectedObj.id);
console.log(accessProtectedObj.name);
