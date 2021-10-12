const arrayOne = [7, 6, 8, 9, 2, 25];
const arrayTwo = [6, 8, 9, 2, 25];
const arrayThree = [6, 8, 9, 2, 25, 7];

function arrayCompare(a1: number[], a2: number[]): boolean {
  if (a1.length !== a2.length) {
    return false;
  }

  a1.sort();
  a2.sort();

  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
}

console.log(`Are ${ arrayOne } and ${ arrayTwo } equal?`, arrayCompare(arrayOne, arrayTwo));
console.log(`Are ${ arrayOne } and ${ arrayThree } equal?`, arrayCompare(arrayOne, arrayThree));
console.log(`Are ${ arrayTwo } and ${ arrayThree } equal?`, arrayCompare(arrayTwo, arrayThree));

