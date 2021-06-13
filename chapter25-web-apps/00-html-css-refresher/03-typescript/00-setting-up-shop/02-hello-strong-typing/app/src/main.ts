let myString: string = `Hello to Jason Isaacs!`;

console.log(myString);

/* strong typing */
//myString = 1; /* compilation error: Type 'number' is not assignable to type 'string' */

/* basic types and type annotation */
let myBoolean : boolean = true;
var myNumber : number = 1234;
let myStringArray : string[] = [`one`, `two`, `three`];

console.log(myBoolean);
console.log(myNumber);
console.log(myStringArray);

myBoolean = myNumber == 4567;
myStringArray = [myNumber.toString(), '4567'];

console.log(myBoolean);
console.log(myNumber);
console.log(myStringArray);

/* type inference */
var inferredString = `my inferred string`;

/* duck typing */
var nameIdObject = { name: 'myName', id: 1, print() { } };
nameIdObject = { id: 2, name: 'anotherName', print() { } }; /* Reassignment is OK - inferred using duck typing */

// nameIdObject = { id: 3, name: 'yetAnotherName' }; /* ERROR: cannot reassign because print is missing */


var obj1 = { id: 1, print() { } };
var obj2 = { id: 2, print() { }, select() { } };

obj1 = obj2; /* Reassignment OK: at least it has id and print() */
// obj2 = obj1; /* ERROR: obj1 does not feature select() */

/* function signatures */
function calculate(a: number, b: number, c: number): number {
  return (a * b) + c;
}

console.log(calculate(3, 2, 1));

function printResult(a: string) : void {
  console.log(`The result is ${a}`);
}

printResult('25');
// printResult(25); /* ERROR: this won't work! */