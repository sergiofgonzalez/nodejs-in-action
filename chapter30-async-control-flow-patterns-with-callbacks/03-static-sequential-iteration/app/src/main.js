function asyncStep1(cb) {
  console.log(`EXECUTING: asyncStep1`);
  setTimeout(() => {
    cb();
  }, 500);
}

function asyncStep2(cb) {
  console.log(`EXECUTING: asyncStep2`);
  setTimeout(() => {
    cb();
  }, 100);
}

function asyncStep3(cb) {
  console.log(`EXECUTING: asyncStep3`);
  setTimeout(() => {
    cb();
  }, 200);
}


/*
  if we don't orchestrate the calls, they will end in an
  unexpected order
*/
// asyncStep1(() => {
//   console.log(`COMPLETED: asyncStep1`);
// });
// asyncStep2(() => {
//   console.log(`COMPLETED: asyncStep2`);
// });
// asyncStep3(() => {
//   console.log(`COMPLETED: asyncStep3`);
// });

/*
  To execute them in order we need to wrap them in functions
  and create a chain of calls
*/
function task1(cb) {
  asyncStep1(() => {
    console.log(`COMPLETED: task1`);
    task2(cb);
  });
}

function task2(cb) {
  asyncStep2(() => {
    console.log(`COMPLETED: task2`);
    task3(cb);
  });
}

function task3(cb) {
  asyncStep3(() => {
    console.log(`COMPLETED: task3`);
    cb();
  });
}

task1(() => {
  console.log(`tasks 1, 2, and 3 completed!`);
});
