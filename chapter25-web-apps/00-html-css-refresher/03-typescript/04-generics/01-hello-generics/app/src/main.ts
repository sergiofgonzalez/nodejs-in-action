/* Hello, generics syntax */
function printGeneric<T>(value: T) {
  console.log(`typeof value is`, typeof value);
  console.log(`value is`, value);
}

interface IPerson {
  name: string;
  age: number;
}

class Person implements IPerson {
  name = '';
  age = 0;
}

printGeneric(1);
printGeneric('Jason Isaacs');
printGeneric(true);
printGeneric({id: 1});
// eslint-disable-next-line @typescript-eslint/no-empty-function
printGeneric(() => {});
printGeneric(new Person());
printGeneric<IPerson>(new Person());
printGeneric<Person>(new Person());

/* using two types */

function printTwoTypes<A, B>(first: A, second: B) {
  console.log(`first:`, first);
  console.log(`second:`, second);
}

printTwoTypes(5, 'hello');
printTwoTypes({ id: true }, ['hello', 'to', 'Jason']);

/* Constraining the type of T */
class Concatenator<T extends Array<string> | Array<number>> {
  concatenateArray(items: T) {
    let returnString = '';
    for (let i = 0; i < items.length; i++) {
      returnString += i > 0 ? ',' : '';
      returnString += items[i].toString();
    }
    return returnString;
  }
}

const concatenator = new Concatenator();

let concatResult = concatenator.concatenateArray(['one', 'two', 'three']);
console.log(concatResult);

concatResult = concatenator.concatenateArray([1, 2, 3, 4, 5]);
console.log(concatResult);

/* Additional constraints */
interface IPrintID {
  id: number;
  print(): void;
}

interface IPrintName {
  name: string;
  print(): void;
}

function useT<T extends IPrintID | IPrintName>(item: T) {
  item.print();
//   item.id = 1;        // ERROR: not common to IPrintID and IPrintName
//   item.name = 'test'; // ERROR: not common to IPrintID and IPrintName
}

class Actor implements IPrintName {
  constructor(public name: string) {}
  print(): void {
    console.log(this.name);
  }
}

const actor = new Actor('Idris Elba');
useT(actor);


/* Generic constraints */

function printProperty<T, K extends keyof T>(object: T, key: K) {
  const propertyValue = object[key];
  console.log(`object[${key}] = ${propertyValue}`);
}

const obj1 = {
  id: 1,
  name: 'Jason Isaacs',
  print() {
    console.log(`Hello to ${this.name}(${this.id})`);
  }
};

printProperty(obj1, 'id');
printProperty(obj1, 'name');
// printProperty(obj1, 'middleName'); // ERROR: middleName not assignable


/* Generics in interfaces */

interface IPrint {
  print(): void;
}

interface ILogInterface<T extends IPrint> {
  logToConsole(iPrintObj: T): void;
}

class Logger<T extends IPrint> implements ILogInterface<T> {
  logToConsole(iPrintObj: T): void {
    iPrintObj.print();
  }
}

const printObject: IPrint = {
  print() {
    console.log(`printObject.print() called`);
  }
};

const logger = new Logger();
logger.logToConsole(printObject);

/* Creating objects with generics */
class A { }
class B { }

function createInstance<T>(arg: { new(): T }): T {
  return new arg();
}

const aInstance = createInstance(A);
const bInstance = createInstance(B);

console.log(`aInstance instanceof A:`, aInstance instanceof A);
console.log(`bInstance instanceof B:`, bInstance instanceof B);
console.log(`aInstance instanceof B:`, aInstance instanceof B);
