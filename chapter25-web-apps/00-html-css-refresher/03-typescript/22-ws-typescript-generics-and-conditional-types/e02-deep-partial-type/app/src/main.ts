/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

type PartialPrimitive = string
  | number
  | boolean
  | symbol
  | bigint
  | Function
  | Date;


type DeepPartial<T> = T extends PartialPrimitive ? T
: T extends Array<infer U> ? DeepPartialArray<U>
: T extends Set<infer U> ? DeepPartialSet<U>
: T extends Map<infer K, infer V> ? DeepPartialMap<K, V>
: T extends {} ? { [K in keyof T] ?: DeepPartial<T[K]> }
: Partial<T>;


interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}
interface DeepPartialSet<T> extends Set<DeepPartial<T>> {}
interface DeepPartialMap<K, V> extends Map<DeepPartial<K>, DeepPartial<V>> {}


/* patching simple objects */

interface User {
  first: string;
  middle?: string;
  last: string
}

function patchUser(savedData: User, fieldsToUpdate: DeepPartial<User>) {
  return { ...savedData, ...fieldsToUpdate };
}

const user: User = {
  first: 'Jason',
  last: 'Isaac'
};


console.log(`=== Patching simple objects (single level)`);
const updatedUser = patchUser(user, { middle: 'B.', last: 'Isaaks' });
console.log(`original:`, user);
console.log(`updated :`, updatedUser);


/* patching primitives */
function patchPrimitive(savedData: PartialPrimitive, updatedData: DeepPartial<PartialPrimitive>) {
  return updatedData;
}

console.log(`=== Patching primitives`);
const personName = 'Jason Isaacs';
const updatedPerson = patchPrimitive(personName, 'Oscar Isaaks');
console.log(`original:`, personName);
console.log(`updated :`, updatedPerson);

// type Name = string;

function isPartialPrimitive(v: PartialPrimitive | any): v is PartialPrimitive {
  return typeof v === 'string'
    || typeof v === 'number'
    || typeof v === 'boolean'
    || typeof v === 'symbol'
    || typeof v === 'bigint'
    || typeof v === 'function'
    || v instanceof Date;
}


/* patching arrays */
const users: User[] = [
  { first: 'Jason', last: 'Isaacs' },
  { first: 'Idris', last: 'Elba' }
];

function patchUsers(savedUsers: User[], updatedUsers: DeepPartial<User[]>) {
  const result: User[] = [];
  updatedUsers.forEach((updatedUser, i) => {
    result.push({ ...savedUsers[i], ...updatedUser });
  });
  return result;
}

console.log(`=== Patching arrays`);
const updatedUsers = patchUsers(users, [{ middle: 'A.' }, { middle: 'B.' }]);
console.log(`original:`, users);
console.log(`updated :`, updatedUsers);


// function patchData<T>(existingData: T, fieldsToUpdate: DeepPartial<T>) {
//   if (isPartialPrimitive(fieldsToUpdate)) {
//     return fieldsToUpdate;
//   }
// }

// const modified = patchData('hello, world!', 'hello to Jason Isaacs!');
// console.log(`modified:`, modified);
