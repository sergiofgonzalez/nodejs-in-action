# 20-ecmascript6-infinite-sequences
> illustrates the basics of ES6 infinite sequences

## Description
The ES6 iterator protocol can be used to turn regular ES6 objects into iterable sequences. In this example, it is illustrated how to deal with infinite sequences.
These types of sequences represent a challenge because if not handled properly, getting results from them can crash your program.

You can either do:
+ destructure into a finite number of receivers: `const [num1, num2] = random;`
+ use `for..of` but with a `break` condition that will let the loop end eventually
+ create functions that encapsulate the access to the finite sequence such as `take(sequence, numItems)` or `range(sequence, low, high)`.

