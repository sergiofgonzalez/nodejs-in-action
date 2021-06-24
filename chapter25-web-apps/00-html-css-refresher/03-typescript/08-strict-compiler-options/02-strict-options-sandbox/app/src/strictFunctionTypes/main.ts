/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* with functions */
function withCallback(fn: (a: number | string) => void) {
  console.log(`withCallback`);
  fn(55);
  fn('Hello');
}

function myFn(a: number | string) {
  console.log(`a:`, a);
}

withCallback(myFn); // OK
// withCallback((a: number) => { console.log(a); }); // ERROR: not assignable


/* with inheritance */
class WithPrint {
  print() { }
}

class WithPrintAndRun extends WithPrint {
  run() { }
}

function usePrint(fn: (withPrint: WithPrint) => void) {
  const withPrint = new WithPrint();
  fn(withPrint);
}

/* ERROR:
  `usePrint()` will pass a `WithPrint` instance to the callback
  which is expecting a `WithPrintAndRun` instance that will make
  it fail!
*/
// usePrint((withRun: WithPrintAndRun) => {
//   withRun.run();
// });