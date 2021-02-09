# Chapter 26 &mdash; Functional Programming
## [Part 0: Fundamentals](../part00-fundamentals/)
### Section 02: Lists: sequential representation

#### Contents
+ The **List** ADT
+ The **Stack** ADT
+ The **Queue** ADT

#### Intro

This section will delve into the definition and operations of three of the most common *abstract data types (ADTs)*: the **List**, the **Stack** and the **Queue**.

In this section we'll also implement the operation using the simplest possible implementation: their sequential representation.

#### The *List* ADT

> A **List** is a collection of elements of the same type and arranged in order.

As a **list** is ordered, all the elements (except for the first one), will have a *previous* one, and all the elements (except for the last one), will have a *next* one.

Also, each of the elements will have a position assigned. This position does not necessarily have to do with its value, but rather by its relative position with the rest of the elements.

The *regular* **List** should support the following operations:
+ `createList(...)` &mdash; initializes and returns an empty list
+ `isEmpty()` &mdash; returns `true` if the list is empty, `false` otherwise.
+ `insert(item, pos)` &mdash; inserts the given item in the list, in the position `pos` given. Therefore, `pos` should be in the range `[0, length]`. After inserting the item, the list length should have increased, and the elements in position from `pos + 1` to the end of the list should have been shifted *right* one position.
+ `remove(pos)` &mdash; the element at the given position `pos` is removed from the list. Elements from `pos + 1` until the end of the list should have been shifted *left* one position.
+ `length` &mdash; returns the number of elements of the list
+ `forEach(operationFn)` &mdash; traverses the list in order applying the given operation to each of the elements.

| NOTE: |
| :------- |
| The **List** described in the section above is a mutable one. Typically, you should prefer immutable data types. |





#### Implementing the *List* operations

#### The *Stack* ADT

