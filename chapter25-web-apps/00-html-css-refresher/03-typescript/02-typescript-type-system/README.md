# TypeScript: Chapter 02 &mdash; TypeScript's Type System
> TBD

## Contents

TBD

## Intro
48/539

## any, let, unions, and enums

### The `any` type

TypeScript allows you to use the *type annotation* syntax to define what a particular variable, or function parameter, or function return type should be:

```typescript
var myVarName: type;
function myFunction(a: type1, b: type2): returnType { ... }
```

TypeScript introduces the `any` type for the situations in which we want to benefit from JavaScript's *relaxed* typing system.

For example, we already know that this will not compile in TypeScript:

```typescript
var item1 = { id: 1, name: 'item1' };
item1 = { id: 2 };  /* ERROR: object does not feature `name` property */
```

so they way to fix it in TypeScript is to annotate `item1` as follows:

```typescript
var item1: any = { id: 1, name: 'item1' };
item1 = { id: 2 };  /* OK: it is `any` */
```

> The `any` type allows a variable to follow JavaScript loosely defined typing rules so that *anything* can be assigned to *anything*.

| NOTE: |
| :---- |
| The usage of `any` is needed to backward compatibility with JavaScript, but its usage is discouraged, as it disables TypeScript's *strong typing* system. |

### Explicit casting

As with any other strongly typed language, there will be situations on which we need to explicitly specify the type of an expression using a cast.

In TypeScript we use the following syntax forms:

```typescript
var item1 = <any>{ id: 1, name: 'item1' };
// or
var item1 = { id: 1, name: 'item1' } as any;
```

### The `let`  and `const` keywords

TypeScript allows you (and actually encourages you) to use the `let` and `const` keywords when defining variables instead of using `var`. This helps the compiler pick up any mistakes, and make better decisions when generating JavaScript code.

### Union types



### Type guards

### Type aliases

### Enums

#### String enums

#### Const enums

## More primitive types

### Undefined

### Null

### Conditional expressions

### Optional chaining

### Nullish coalescing

### Null or undefined operands

### Definite assignment

### Object

### Unknown

### Never

### Never and switch

## Object spread

### Spread precendence

### Spread with arrays

## Tuples

### Tuple destructuring

### Optional tuple elements

### Tuples and spread syntax

### Object destructuring

## Functions

### Optional parameters

### Default parameters

### Rest parameters

### Function callbacks

### Function signatures as parameters

### Function overrides

### Literals

## Summary

## You know you've mastered this chapter when...

TBD

## Exercises, code examples, and mini-projects

