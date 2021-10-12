function sum(x: number, y: number): number {
  return x + y;
}

// function curriedSum(x: number): (y: number) => number {
//   return (y: number): number => {
//     return x + y;
//   };
// }

const curriedSum = (x: number): ((y: number) => number) =>
  (y: number): number => x + y;

console.log(sum(2, 3));
console.log(curriedSum(2)(3));

const twoPlus = curriedSum(2);
console.log(twoPlus(3)); // -> 5

