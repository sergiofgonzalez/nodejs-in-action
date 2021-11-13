// function identityNumber(x: number): number {
//   return x;
// }

// function identityString(x: string): string {
//   return x;
// }

// function identityAny(x: any): any {
//   return x;
// }


function identity<T>(x: T): T {
  return x;
}

const num = identity(1.234e3);
const str = identity('foo');

console.log(num.toFixed());
// console.log(str.toFixed()); // Property toFixed does not exist on type
