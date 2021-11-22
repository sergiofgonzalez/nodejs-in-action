function getLength<T extends any[] | string>(x: T): number {
  return x.length;
}

console.log(`=== getLength`);
console.log(`getLength([1, 2, 3]):`, getLength([1, 2, 3]));
console.log(`getLength(['a', 'new', 'day']):`, getLength(['a', 'new', 'day']));
console.log(`getLength('Jason Isaacs'):`, getLength('Jason Isaacs'));
// console.log(`getLength(4):`, getLength(4)); // Argument of type number is not assignable to string | any[]

function toDate<T extends Date | number>(x: T): Date {
  if (x instanceof Date) {
    return x;
  }
  return new Date(x);
}

console.log(`=== typeof vs. instanceof`);
const x = new Date();
console.log(typeof x);          // -> object
console.log(x instanceof Date); // -> true

console.log(`=== toDate`);
console.log(`toDate(Date.now()):`, toDate(Date.now()));
console.log(`toDate(x):`, toDate(x));
console.log(`toDate(x.getTime()):`, toDate(x.getTime()));
