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
