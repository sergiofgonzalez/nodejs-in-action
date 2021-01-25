'use strict';

/* strict equality */
console.log(`3 === 3.0: ${ 3 === 3.0 }`); // true
console.log(`'yes' === 'yes': ${ 'yes' === 'yes' }`); // true
console.log(`null === null: ${ null === null }`); // true
console.log(`false === false: ${ false === false }`); // true
console.log(`42 === '42': ${ 42 === '42' }`); // false: fails type check
console.log(`'hello' === 'Hello': ${ 'hello' === 'Hello' }`); // false
console.log(`true === 1: ${ true === 1 }`); // false: fails type check (boolean)
console.log(`0 === null: ${ 0 === null }`); // false: same
console.log(`'' === null: ${ '' === null }`); // false
console.log(`null === undefined: ${ null === undefined }`); // false
console.log(``);

// eslint-disable-next-line use-isnan
console.log(`NaN === NaN: ${ NaN === NaN }`); // false

// eslint-disable-next-line no-compare-neg-zero
console.log(`0 === -0: ${ 0 === -0 }`);
console.log(``);

// alternatives:
console.log(`Number.isNan(Nan): ${ Number.isNaN(NaN) }`);
console.log(`Object.is(NaN, NaN): ${ Object.is(NaN, NaN) }`);
console.log(`Object.is(0, -0): ${ Object.is(0, -0) }`);
console.log(``);

// For objects, equals check for identity equality and not structural equality
console.log(`[1, 2, 3] === [1, 2, 3]: ${ [1, 2, 3] === [1, 2, 3] }`);
console.log(`{a: 5} === {a: 5}: ${ {a: 5} === {a: 5} }`);
console.log(`x => x * 2 === x => x * 2: ${ (x => x * 2) === (x => x * 2) }`);
console.log(``);

// references
let x = [1, 2, 3];

let y = x;
console.log(`y === x: ${ y === x }`);
console.log(``);

/* coercive equality */
console.log(`3 == 3.0: ${ 3 == 3.0 }`); // true
console.log(`'yes' == 'yes': ${ 'yes' == 'yes' }`); // true
console.log(`null == null: ${ null == null }`); // true
console.log(`false == false: ${ false == false }`); // true
console.log(`42 == '42': ${ 42 == '42' }`); // true
console.log(`'hello' == 'Hello': ${ 'hello' == 'Hello' }`); // false
console.log(`true == 1: ${ true == 1 }`); // true
console.log(`0 == null: ${ 0 == null }`); // false
console.log(`'' == null: ${ '' == null }`); // false
console.log(`null == undefined: ${ null == undefined }`); // true
console.log(``);

/* relational comparisons are coercive */
const arr = ['1', '10', '100', '1000'];
for (let i = 0; i < arr.length && arr[i] < 500; i++) {
  console.log(i);
}
console.log(``);

console.log(`'10' < '9': ${ '10' < '9' }`);
console.log(``);