# Functional Programming for Java (yes, Java) &mdash; 03: Data Structures and Algorithms
## 04 &mdash; Combinator Functions
> practising functional operations: filter, map and fold

### Combinator Functions

In functional programming, there are three core operations that are the basis of almost all work you do with collections:

+ *filter* &mdash; create a new collection keeping only the elements for which a filter function returns true. The size of the new collection will be less than or equal to the size of the original collection.
+ *map* &mdash; create a new collection where each element from the original collection is transformed into a new value. Both the original collection and the new collection will have the same size.
+ *fold* &mdash; starting with a seed value, traverse through the collection and use each element to build up a new final value where each element from the original collection contributes to the final value. For example, you use fold to sum a list of integers.

#### Notes on fold

Two variants of fold are typically defined: `foldLeft` and `foldRight`. These methods are the hardest to grasp, but they are the most important as all the other methods could be implemented using them.

The reason there are two versions is because how the function is applied while traversing the list can be done in two different ways, and in some cases, the two version will render different results.

##### `foldLeft`
The first version, `foldLeft` groups the elements from left to right.

Consider the following example:
```
(1, (2, (3, 4, ()))).foldLeft(0, (seed, item) => seed + item) --> ((((0 + 1) + 2) + 3) + 4)
```

##### `foldRight`
The second variant of *fold*, `foldRight` groups the elements from right to left.

Consider the following example:
```
(1, (2, (3, 4, ()))).foldRight((item, seed) => seed + item, 0) --> (1 + (2 + (3 + (4 + 0))))
```
