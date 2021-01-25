/* continuation-passing style (async) */
function addCps(a, b, cb) {
  setTimeout(() => cb(a + b), 100);
}

console.log(`2: continuation-passing style: `, addCps(2, 3, (result) => console.log(`1: result=`, result)));
console.log(`3: finish`);
