# e02: Generics and Conditional Types &mdash; Creating a `DeepPartial<T>` type
> A detailed example with step by step information about how to create a complex type `DeepPartial<T>`.


## Implementation notes
1. Primitives &mdash; strings, numbers, and other primitives, in addition to dates are not something we can apply `Partial` to. As a result, for all the primitives, `DeepPartial<Primitive> -> Primitive`. For example, `DeepPartial<string> -> string`.

2. For constructs like objects, `Array`, `Set`, and `Map` we need to infer the types of their elements and apply `DeepPartial` to their items.

3. For the rest of the case, we will just apply `Partial`.

## Steps
1. Create a `PartialPrimitive` type containing all the primitive types to which we would apply `DeepPartial<Primitive> -> Primitive`.

```typescript
type PartialPrimitive = string
  | number
  | boolean
  | symbol
  | bigint
  | Function
  | Date;
```

2. Define a basic `DeepPartial<T>` type that can handle primitives and objects at the top level:

```typescript
type DeepPartial<T> = T extends PartialPrimitive ? T : T extends {} ? { [K in keyof T] ?: DeepPartial<T[K]> } : Partial<T>;
```

Note that the previous snippet contains a chain of conditional type expressions. It can be reformatted for easier reading:

```typescript
type DeepPartial<T> = T extends PartialPrimitive ? T
: T extends {} ? Partial<T> : never;
```

We can test our very first implementation with the following snippet:

```typescript
interface User {
  first: string;
  middle?: string;
  last: string
}


function patchData(savedData: User, fieldsToUpdate: DeepPartial<User>) {
  return { ...savedData, ...fieldsToUpdate };
}

const user: User = {
  first: 'Jason',
  last: 'Isaac'
};

const updatedUser = patchData(user, { middle: 'B.', last: 'Isaaks' });
console.log(`original:`, user);
console.log(`updated :`, updatedUser);
```

Also, for primitives:

```typescript
function patchPrimitive(savedData: PartialPrimitive, updatedData: DeepPartial<PartialPrimitive>) {
  return updatedData;
}

console.log(`=== Patching primitives`);
const personName = 'Jason Isaacs';
const updatedPerson = patchPrimitive(personName, 'Oscar Isaaks');
console.log(`original:`, personName);
console.log(`updated :`, updatedPerson);
```

3. Add support for arrays by explicit defining a `DeepPartialArray<T>` and add it to the `DeepPartial<T>` definition:

The first part consists of the following definition:

```typescript
interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}
```

Note that we're just creating an alias for `Array<DeepPartial<T>>`.

The interesting part is in the updated `DeepPartial<T>` definition:

```typescript
type DeepPartial<T> = T extends PartialPrimitive ? T
: T extends Array<infer U> ? DeepPartialArray<U>
: T extends {} ? Partial<T> : never;
```

This can be tested with the following snippet:

```typescript
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
```

4. You can add support in a similar fashion for `Set`s. You have to define a `DeepPartialSet<T>` and include the handling of `Set` in the `DeepPartial<T>` type:

```typescript
type DeepPartial<T> = T extends PartialPrimitive ? T
: T extends Array<infer U> ? DeepPartialArray<U>
: T extends Set<infer U> ? DeepPartialSet<U>
: T extends {} ? Partial<T> : never;


interface DeepPartialSet<T> extends Set<DeepPartial<T>> {}
```

5. Similarly for `Map`s. You have to define a `DeepPartialMap<T>` and include the handling of `Map` in `DeepPartial<T>`:

```typescript
type DeepPartial<T> = T extends PartialPrimitive ? T
: T extends Array<infer U> ? DeepPartialArray<U>
: T extends Set<infer U> ? DeepPartialSet<U>
: T extends Map<infer K, infer V> ? DeepPartialMap<K, V>
: T extends {} ? Partial<T> : never;

interface DeepPartialMap<K, V> extends Map<DeepPartial<K>, DeepPartial<V>> {}
```

6. Finally, we need to add support for objects within objects. That can be done modifying our existing portion that handles objects: `T extends {} ? Partial<T>` and using a more contrived construct:

```typescript
T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> } : ...
```

That snippet will inspect the object properties and recursively traverse them.

So finally, we have:

```typescript
type DeepPartial<T> = T extends PartialPrimitive ? T
: T extends Array<infer U> ? DeepPartialArray<U>
: T extends Set<infer U> ? DeepPartialSet<U>
: T extends Map<infer K, infer V> ? DeepPartialMap<K, V>
: T extends {} ? { [K in keyof T] ?: DeepPartial<T[K]> }
: Partial<T>;
```

Note that we also remove the `never` as we can use the standard `Partial<T>` whenever any of the other use cases match.

