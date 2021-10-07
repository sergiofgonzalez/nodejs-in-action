# 05: TypeScript Fundamentals &mdash; Using arrays and tuples for efficient sorting of objects
> illustrates how to use arrays and tuples to create an efficient sorting algorithm.

## Exercise 1.05

### The Schwartzian transform
Arrays have a `sort` function that can be used to sort the elements contained in the array. However, during this sorting process, multiple comparisons will be done on the same elements.

For example, if we sort an array of 100 numbers using this approach, the function that compares the two numbers will be called more than 500 times on average.

In the first section of `main.ts` we illustrate this problem. We define an array of numbers with 100 random numbers and sort them using this method. During the process, we count the number of times the comparison function is being called and it is larger than 500!

For simple number sorting this is fine, but consider now that we would want to sort a more complex object, like the one defined in the following interface:

```typescript
interface Person {
  firstName: string;
  lastName: string;
}
```

To sort the array, we'd need a helper function to compute the full name of the person using a function such as:

```typescript
function getFullName(person: Person) {
  return `${ person.firstName } ${ person.lastName };
}
```

And then do the actual sorting:

```typescript
persons.sort((firts, second) => {
  const firstFullName = getFullName(first);
  const secondFullName = getFullName(second);
  return firstFullName.localeCompare(secondFullName);
});
```

As you can see, we'd end up with more than 1000 calls to the `getFullName()` function to sort 100 persons, which will be highly inefficient.

It is possible to optimize this sorting process using what is called a *Schwartzian transform*.

The process has three parts:
+ you transform each element in the array into a tuple of two elements. The first element will be the original value, and the second will be the result of the ordering function (coloquially, the *Schwartz*).
+ you sort the array on the second element of the tuple
+ you transform each tuple, discarding the ordering element and taking the original value

We will illustrate this method in this exercise to sort and print a predefined array of `Person` instances.


1. Define the following interface in your program:

```typescript
interface Person {
  firstName: string;
  lastName: string;
}
```

2. Implement the `getFullName()` function that returns the fullname of a `Person`. Make sure you count how many times `getFullName()` is being called.

3. Define the following array of persons:

```typescript
const programmers: Person[] = [
  { firstName: 'Donald', lastName: 'Knuth'},
  { firstName: 'Barbara', lastName: 'Liskow'},
  { firstName: 'Lars', lastName: 'Bak'},
  { firstName: 'Guido', lastName: 'Van Rossum'},
  { firstName: 'Anders', lastName: 'Hejslberg'},
  { firstName: 'Edsger', lastName: 'Dijkstra'},
  { firstName: 'Brandon', lastName: 'Eich'},
  { firstName: 'Bjarne', lastName: 'Stroustrup'},
  { firstName: 'Brian', lastName: 'Kernighan'},
  { firstName: 'Dennis', lastName: 'Ritchie'}
];
```

4. Define a function `naiveSortPersons()` that takes an array of `Person` instances and returns a new array in which the entries are sorted by *full name*.

| NOTE: |
| :---- |
| You can use `Array.slice()` to quickly obtain a shallow copy of the original array, so that the one received as a parameter is left untouched. |

5. Define a function `schwartzSortPersons(persons: Person[])` that performs the sorting using the *Schwartz transform*. The second element of the tuple will be the full name of the person.

| NOTE: |
| :---- |
| You will need to define an array of tuples, which can be denoted as `const tuples: [Person, string][]`. |

6. Execute both sorting procedures and compare the number of usage counts and the time it took to execute the sorting process.