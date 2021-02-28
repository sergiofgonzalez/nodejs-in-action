
/* target object */
function greeterService({ from, to, message}) {
  console.log(`A message from ${ from } to ${ to }: ${ message }`);
}

/* direct invocation (no command) */
greeterService({ from: 'mark', to: 'jason', message: 'hello '});


/* we define the *Command* pattern with a task */
function createTask(target, ...args) {
  return () => {
    target(...args);
  };
}

/* we can create a task representing the call to target with a closure */
const greeterTask1 = createTask(greeterService, { from: 'simon', to: 'tom', message: 'everything will be alright in the end' });

// we can then call it at later time
setTimeout(greeterTask1, 1500);

/* we can do a similar thing with *bound functions* */
const greeterTask2 = greeterService.bind(null, { from: 'mark', to: 'chuckles', message: 'stop laughing now!' });

// we can then call it at a later time
setTimeout(greeterTask2, 2500);

