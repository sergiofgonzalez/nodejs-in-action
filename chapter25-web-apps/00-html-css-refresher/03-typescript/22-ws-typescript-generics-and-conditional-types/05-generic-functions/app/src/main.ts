
// map accepts a function that maps an individual item of type `T`
// to another element of type `U` and returns a function that will
// accept an array of elements of type `T` and will apply the function
// given as argument to each of the elements of the array
function map<T, U>(fn: (item: T) => U) {
  return (items: T[]) => {
    return items.map(fn);
  };
}

const multiplier = map((x: number) => x * 2);
const nums = [1, 2, 3];

console.log(multiplier(nums));

const lengthify = map((x: string) => x.length);
const words = ['hello', 'to', 'jason', 'isaacs'];
console.log(lengthify(words));
