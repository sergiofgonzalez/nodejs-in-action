/* eslint-disable @typescript-eslint/no-unused-vars */
interface IAbRequired {
  a: number;
  b: string;
}

const ab: IAbRequired = {
  a: 1,
  b: 'test'
};

type WeakInterface<T> = {
  [K in keyof T]?: T[K];
}

const allOptional: WeakInterface<IAbRequired> = {};
const aOptional: WeakInterface<IAbRequired> = { a: 55 };
const bOptional: WeakInterface<IAbRequired> = { b: 'Ed Norton' };
// const errOptional: WeakInterface<IAbRequired> = { age: 51 }; // ERROR: not assignable

/* Partial */

const allPartial: Partial<IAbRequired> = {};
const aPartial: Partial<IAbRequired> = { a: 88 };

/* Required */

interface WeakTypeAB {
  a?: number;
  b?: string;
}

const allRequired: Required<WeakTypeAB> = {
  a: 55,
  b: 'foo'
};

/*
const notAllRequired: Required<WeakTypeAB> = { // ERROR: missing b
  a: 55
};
*/

/* readonly */
const readonlyVar: Readonly<IAbRequired> = {
  a: 1,
  b: 'foobar'
};

// readonlyVar.a = 55; // ERROR: readonly property

/* Pick */

interface IAbc {
  a: number;
  b: string;
  c: boolean;
}

type PickAb = Pick<IAbc, 'a' | 'b'>;

const pickAbObj: PickAb = {
  a: 1,
  b: 'foo'
};

/* ERROR: missing b */
// const pickAbObj2: PickAb = {
//   a: 1
// };

/* Record */
type RecordCd = Record<'c' | 'd', number>;
const recordCdObj: RecordCd = {
  c: 1,
  d: 1
};


/* Conditional types */
type NumberOrString<T> = T extends number ? number : string;

function printNumOrString<T>(input: NumberOrString<T>) {
  console.log(input);
}

printNumOrString<number>(1);
printNumOrString<string>('test');
// printNumOrString<boolean>(true); // ERROR: not assignable to string
printNumOrString<boolean>('boolean is not a string');

/* Conditional type chaining */
interface IA {
  a: number;
}

interface IAb {
  a: number;
  b: string;
}

interface IAbc {
  a: number;
  b: string;
  c: boolean;
}

type abc_ab_a<T> =
  T extends IAbc ? [number, string, boolean] :
  T extends IAb ? [number, string] :
  T extends IA ? [number] :
  never;

function getTupleStringAbc<T>(tupleValue: abc_ab_a<T>): string {
  const [...tupleItems] = tupleValue;
  let resultString = '|';
  for (const value of tupleItems) {
    resultString += `${value}|`;
  }
  return resultString;
}

const keyA = getTupleStringAbc<IA>([1]);
const keyAb = getTupleStringAbc<IAb>([1, 'foo']);
const keyAbc = getTupleStringAbc<IAbc>([1, 'bar', false]);

console.log(keyA);
console.log(keyAb);
console.log(keyAbc);

/* Distributed conditional types */
type dateOrNumberOrString<T> =
  T extends Date ? Date :
  T extends number ? Date | number :
  T extends string ? Date | number | string :
  never;

function compareValues<T extends string | number | Date | boolean>(input: T, compareTo: dateOrNumberOrString<T>) {
  // comparison logic
}

compareValues(new Date(), new Date());
compareValues(1, new Date());
compareValues(1, 2);
compareValues('test', new Date());
compareValues('test', 1);
compareValues('test', 'test');
// compareValues(true, 1); // ERROR: not assignable to never


/* Conditional type inference */
type inferFromPropertyType<T> =
  T extends { id: infer U } ? U : never;

function testInferFromPropertyType<T>(arg: inferFromPropertyType<T>) {
  // some logic here
}

testInferFromPropertyType<{ id: string }>('test');
testInferFromPropertyType<{ id: number }>(5);
// testInferFromPropertyType<{ id: number }>('test'); // ERROR: string not assignable to number
// testInferFromPropertyType<{ uuid: string }>('uuid'); // ERROR: string not assignable to never

/* Type inference from function signatures */
type inferredFromFnParam<T> =
  T extends (a: infer U) => void ? U : never;

function testInferredFromFnParam<T>(arg: inferredFromFnParam<T>) {
  // some logic here
}

testInferredFromFnParam<(a: number) => void>(1);
testInferredFromFnParam<(a: string) => void>('test');
testInferredFromFnParam<(a: boolean) => void>(false);
testInferredFromFnParam<(a: string) => string>('test'); // this should fail but doesn't

// inferring from the return type

type inferredFromFnReturnType<T> =
  T extends (a: string) => infer U ? U : never;

function testInferredFromFnReturnType<T>(arg: inferredFromFnReturnType<T>) {
  // some logic here
}

testInferredFromFnReturnType<(a: string) => number>(1);
testInferredFromFnReturnType<(a: string) => string>('foo');
// testInferredFromFnReturnType<(a: string) => void>(1); // ERROR: 1 not assignable to void

/* Type inference from arrays */
type inferredTypeFromArray<T> =
  T extends (infer U)[] ? U : never;

function testInferredFromArray<T>(args: inferredTypeFromArray<T>) {
  // do something here
}

testInferredFromArray<string[]>('test');
testInferredFromArray<number[]>(1);
// testInferredFromArray<string[]>(55); // ERROR: number not assignable to string

/* Standard conditional types */

// Exclude
type ExcludeStringAndNumber = Exclude<
  string | number | boolean,
  string | number
>;

const boolValue: ExcludeStringAndNumber = true;
// const dateValue: ExcludeStringAndNumber = new Date(); // ERROR: not assignable

// Extract
type StringOrNumber = Extract<
string | boolean | never,
string | number
>;

const stringValue: StringOrNumber = 'foo';
// const boolValue: StringOrNumber = true; // ERROR: not assignable


// NonNullable
type NotNullOrUndef = NonNullable<number | undefined | null>;
const numValue: NotNullOrUndef = 1;
let undefValue: NotNullOrUndef;
