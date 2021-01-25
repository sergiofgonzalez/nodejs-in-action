import { Queue } from './lib/Queue_v0.js';


async function main() {
  const queue = new Queue();

  queue._enqueue('one');
  queue._enqueue('two');
  queue._enqueue('three');
  setTimeout(() => {
    queue._enqueue('four');
  }, 2000);
  setTimeout(() => {
    queue._enqueue('five');
  }, 7000);

  for (let i = 0; i < 5; i++) {
    console.log(`${ i }: `, await queue.dequeue());
  }
}

main()
  .then(() => console.log(`INFO: main: done!`))
  .catch((err) => console.error(`ERROR: main: could not complete: ${ err.message }`));
