# 03: Misc concepts &mdash; Types vs. interfaces sandbox
> a collection of examples illustrating some simple capabilities of types and interfaces

## Concept description

In TypeScript we have:
+ basic types: `string`, `number`, `boolean`, `array`, `tuple`...
+ advanced types: such as the ones that are derived from other types: generics, conditional types, mapped types, etc.
+ type aliases: when you create a new *friendly* for an existing type without defining a new type. This is done using the `type` keyword.

In general, when we talk about *types vs. interfaces* we mean *type aliases vs. interfaces*.

In terms of capabilities, types and interfaces are becoming more and more similar with the latest versions of TypeScript, but conceptually:
+ **interfaces** &mdash; a way to describe the shape/behavior of an object.
+ **type** &mdash; a definition of a type of data such as a union, primitive, intersection, tuple...

### Interfaces support declaration merging

Interfaces support declaration merging: this means that the compiler will merge the properties of two or more interfaces that share the same name under a single declaration:

```typescript
interface ToDo {
  title: string;
}

interface ToDo {
  description: string;
}

const task: ToDo = {
  title: 'Learn TypeScript',
  description: 'Read documentation about TS and practice'
};
```

Types do not support declaration merging.


### `extends` and `implements`

Interfaces in TypeScript can extend classes and other interfaces. Classes can implement a given interface.

### Intersection

Type intersection allows you to merge the properties of two or more types to create another type.

You can create a new type by intersecting two interfaces, but you cannot create a new interface from that intersection.

### Union

Type unions allow you to create a new type that has the properties of one or more other types.

Again, you can create a new type by doing the union of two interfaces, but you cannot create a new interface from that union.

### Tuples

Tuples allow you to create a collection of two or more values of different types.

Tuples can only be declared using `type`, but can be used within interfaces.

### Recommendations
+ Use interfaces when you need to define the shape of a new object, or a method.
+ Use types to describe data structures, such as the ones you'd return from a standalone function.

## Example description

A collection of small examples illustrating some of the types and interfaces capabilities.