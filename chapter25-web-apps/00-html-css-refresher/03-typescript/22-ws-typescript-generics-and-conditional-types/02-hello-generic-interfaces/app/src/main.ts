interface MySimpleArray<T> {
  [index: number]: T;
  length: number;
  push(item: T): number;
  pop(): T;
}

class MyArray<T> implements MySimpleArray<T> {
  [index: number]: T;
  length = 0;

  push(item: T): number {
    this[this.length] = item;
    return this.length++;
  }

  pop(): T {
    return this[--this.length];
  }
}

const myNumericArray = new MyArray<number>();
myNumericArray.push(1);
myNumericArray.push(2);
myNumericArray.push(3);

console.log(myNumericArray.length);
for (let i = 0; i < myNumericArray.length; i++) {
  console.log(`${ i }:`, myNumericArray[i]);
}

while (myNumericArray.length) {
  console.log(`pop(): `,myNumericArray.pop());
}
console.log(myNumericArray.length);

myNumericArray[0] = 5;
myNumericArray[1] = 4;
myNumericArray[2] = 3;
myNumericArray[3] = 2;
myNumericArray[4] = 1;
myNumericArray[5] = 0;
myNumericArray.length = 6;

console.log(myNumericArray.length);
for (let i = 0; i < myNumericArray.length; i++) {
  console.log(`${ i }:`, myNumericArray[i]);
}
