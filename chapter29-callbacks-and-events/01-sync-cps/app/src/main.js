
/* direct style */
function add(a, b) {
  return a + b;
}

/* continuation-passing style (sync) */
function addCps(a, b, cb) {
  cb(a + b);
}

console.log(`0: direct style: `, add(2, 3));
console.log(`2: continuation-passing style: `, addCps(2, 3, (result) => console.log(`1: result=`, result)));
console.log(`3: finish`);
