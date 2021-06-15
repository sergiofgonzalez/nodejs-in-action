/* type guards */

function addWithUnion(
  arg1: string | number,
  arg2: string | number
) {
  if (typeof arg1 === 'string') {
    return arg1 + arg2; // concatenation
  }

  if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    return arg1 + arg2; // addition
  }

  /* default: treat both as strings */
  return arg1.toString() + arg2.toString();
}

/* enums */

enum DoorState {
  Open,
  Closed
}

function checkDoorState(state: DoorState) {
  console.log(`enum value is:`, state);
  switch (state) {
    case DoorState.Open:
      console.log(`Door is open`);
      break;
    case DoorState.Closed:
      console.log(`Door is closed`);
      break;
  }
}

checkDoorState(DoorState.Open);
checkDoorState(DoorState.Closed);

/* const enums */
const enum DoorStateConst {
  OPEN = 10,
  CLOSED = 20
}

console.log(`Door is`, DoorStateConst.OPEN);

/* undefined type */
function checkAndPrintElement(elem: string | undefined) {
  if (elem === undefined) {
    console.log(`Invalid array element!`);
  } else {
    console.log(`element:`, elem);
  }
}

const elems = ['zero', 'one', 'two', 'three'];
delete elems[0];

for (const elem of elems) {
  checkAndPrintElement(elem);
}

/* null or undefined operands */
function add(a: number, b: number | null | undefined) {
  // let result = a + b; /* ERROR: Object possibly 'null' or 'undefined'
}

/* definite assignment */
var globalString: string;
setGlobalString('The globalString now has a value');
// console.log(`globalString:`, globalString); /* ERROR: Variable 'globalString' is used before being assigned. */
console.log(`globalString:`, globalString!);
function setGlobalString(value: string) {
  globalString = value;
}

// alternative placement of the definite assignment operator
var anotherGlobalString!: string;
setAnotherGlobalString('anotherGlobalString now has a value');
console.log(`anotherGlobalString:`, anotherGlobalString!);
function setAnotherGlobalString(value: string) {
  anotherGlobalString = value;
}

/* object type */
let structuredObject: object = {
  name: 'myObj',
  properties: {
    id: 1,
    type: 'anObject'
  }
}

function printObject(a: object) {
  console.log(`a:`, a)
}

printObject(structuredObject);
// printObject('Hello to Jason!'); /* ERROR: not assignable to type 'object' */

/* unknown type */
let a: any = 'test';
let aNumber: number = 2;
aNumber = a;  // wait, what??
console.log(`aNumber:`, aNumber); // -> 'test'

let u: unknown = 'unknown value';
u = 1;
let aNumber2: number; // OK: works like any and can warp its type
// aNumber2 = u; /* ERROR: 'unknown' is not assignable to 'number' */
aNumber2 = <number>u; // OK
console.log(`aNumber2:`, aNumber2);

/* never */
function alwaysThrows() {
  throw new Error('this will always throw');
  return -1;  /* dead code, but compiles */
}

function alwaysThrows2(): never {
  throw new Error('this will always throw too');
  // return -1; /* ERROR: type 'number' is not assignable to 'never' */
}

enum AnEnum {
  FIRST,
  SECOND
}

function getEnumValue(enumValue: AnEnum): string {
  switch (enumValue) {
    case AnEnum.FIRST:
      return "first case";
    case AnEnum.SECOND:
      return "second case";
  }
  let returnValue: never = enumValue; /* ERROR: Type 'AnEnum' is not assignable to type 'never' */
  return returnValue;
}


/* spread operator */

// UC1: object copy
let firstObject: object = { id: 1, name: 'firstObject', otherProperties: { age: 47, interests: ['sports', 'movies']} };
let secondObject: object = { ...firstObject };

console.log(`secondObj:`, secondObject);

// UC2: combining objects together
let nameObj: object = { name: 'Jason Isaacs' };
let idObj: object = { id: 1 };

let objCombined = { ...nameObj, ...idObj };
console.log(`objCombined:`, objCombined);


// NOTE: last specified object takes precedence when properties clash
let objPrec1: object = { id: 1, name: "Object name" };
let objPrec2: object = { id: 2, description: "Object description" };
let objPrecCombined = { ...objPrec1, ...objPrec2 };
console.log(`objPrecCombined:`, objPrecCombined); // id: 2

/* using objects */
var item1: object = { id: 1, name: 'item1' }; // Why TypeScript?
item1 = { id: 2 };
console.log(item1);

/* spread with arrays */

// Simple
let firstArray: number[] = [1, 2, 3];
let secondArray: number[] = [4, 5, 6];
let thirdArray = [...firstArray, ...secondArray];
console.log(`third array:`, thirdArray);


// hybrid

let objArray1 = [ { id: 1, name: 'first element' }];
let objArray3 = [ { id: 3, name: 'third element' }];
let objArrayCombined = [
  ...objArray1,
  { id: 2, name: 'second element' },
  ...objArray3
];

console.log(`objArrayCombined:`, objArrayCombined);

/* tuples */
let tuple1: [string, boolean]; /* 2-tuple [string, boolean] */
tuple1 = ['test', true];

console.log(`tuple1:`, tuple1);

// tuple1 = ['test2']; // ERROR: [string] not assignable to [string, boolean]

/* accessing tuples */
console.log(`tuple1[0]:`, tuple1[0]);
console.log(`tuple1[1]:`, tuple1[1]);

/* destructuring typles */
let [elem1, elem2] = tuple1;
console.log(`tuple element 1:`, elem1);
console.log(`tuple element 2:`, elem2);

/* optional tuple elements */
let tupleOptional: [string, boolean?];
tupleOptional = ['test'];
console.log(`tupleOptional[0]:`, tupleOptional[0]);
console.log(`tupleOptional[1]:`, tupleOptional[1]);

/* tuples and spread */
let tupleSpread: [number, ...string[]];
tupleSpread = [1];
tupleSpread = [1, 'string'];
tupleSpread = [1, 'string1', 'string2'];

/* object destructuring */
let complexObject = {
  aNum: 1,
  bStr: 'name',
  cBool: true
};

let { aNum, bStr, cBool } = complexObject;
console.log(`aNum=${aNum}, bStr=${bStr}, cBool=${cBool}`);

// renaming
let { aNum: aFromObj, bStr: bFromObj, cBool: cFromObj } = complexObject;
console.log(`aFromObj=${aFromObj}, bFromObj=${bFromObj}, cFromObj=${cFromObj}`);

/* Functions: optional parameters */
function concatString(a: string, b?: string) {
  console.log(`a + b = ${a + b}`);
}

concatString(`first`, `second`);
concatString(`third`);

/* Functions: default parameters */
function concatStringWithDefault(a: string, b: string = 'default') {
  console.log(`a + b = ${ a + b }`);
}
concatStringWithDefault(`first`, `second`);
concatStringWithDefault(`third`);

/* Functions: rest operators */
function displayReceivedArguments(...args: string[] | number[]) {
  for (const arg of args) {
    console.log(arg);
  }
}

displayReceivedArguments('one');
displayReceivedArguments('one', 'two', 'three', 'catorce');
displayReceivedArguments(1, 2, 3, 14);
//displayReceivedArguments('one', 2, 'three'); // ERROR: ['one', 2, 'three'] is not assignable to string[] or number[]


/* Functions: callbacks */
let addFn = function (a: number, b: number): number {
  return a + b;
}
function compute(
  a: number,
  b: number,
  op: (a: number, b: number) => number
) {
  return op(a, b);
}

const result = compute(2, 3, addFn);
console.log(`result:`, result);

// compute(2, 3, 5); // ERROR: number cannot be assigned to (a: number, b: number) => number

// another example
let myCallback = function (text: string): void {
  console.log(`myCallback invoked with '${text}'`);
}

function withCallbackArgDo(
  message: string,
  callbackFn: (a: string) => void  // why, TypeScript?
) {
  callbackFn(message);
}

withCallbackArgDo('Hello, world!', myCallback);

/* Functions: function overloading */
function addOp(a: string, b: string): string;
function addOp(a: number, b: number): number;
// function addOp(a: boolean, b: boolean): boolean { // ERR: duplicated body
//   if (a || b) {
//     return true;
//   } else {
//     return false;
//   }
// }
function addOp(a: any, b: any) {
  return a + b;
}

console.log(addOp('Hello', 'World'));
console.log(addOp(5, 4));

/* Literals */
type AllowedStringValues = 'one' | 'two' | 'three';
type AllowedNumericValues = 1 | 5 | 8 | 14;

function withLiteralDo(input: AllowedStringValues | AllowedNumericValues) {
  console.log(`invoked with ${ input }`);
}

//withLiteralDo(7);         // ERROR: not assignable
//withLiteralDo('catorce'); // ERROR: not assignable

withLiteralDo(8);
withLiteralDo('three');