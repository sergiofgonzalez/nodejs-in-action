import { CalcStack } from './lib/calc-stack.js';
import readline from 'readline';

const calcStack = new CalcStack();

async function main(commands) {
  if (commands) {
    const str = commands.join(' ');
    const repr = await processString(str);
    console.log(repr);
    return Promise.resolve();
  } else {
    return switchToInteractiveMode();
  }
}

async function processString(str) {
  const commands = str.split(' ');
  for (const command of commands) {
    processInput(command);
  }
  return Promise.resolve(calcStack.toString());
}

async function switchToInteractiveMode() {
  let userInput = await readStdin();
  while (userInput.toLowerCase() !== 'quit' ) {
    processInput(userInput);
    console.log(calcStack.toString());
    userInput = await readStdin();
  }
}

function processInput(input) {
  if (input === '+') {
    calcStack.add();
  } else if (input === '-') {
    calcStack.sub();
  } else if (input === '*') {
    calcStack.mult();
  } else if (input === '/') {
    calcStack.div();
  } else if (input === 'neg') {
    calcStack.neg();
  } else if (input === 'sqrt') {
    calcStack.sqrt();
  } else if (input === 'mod') {
    calcStack.mod();
  } else if (input === 'swap') {
    calcStack.swap();
  } else {
    calcStack.enter(input);
  }
}


async function readStdin() {
  return new Promise(resolve => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    rl.question(`? `, userInput => {
      resolve(userInput);
      rl.close();
    });
  });
}

let calcCommands;
if (process.argv.length > 2) {
  calcCommands = process.argv.slice(2);
}


main(calcCommands)
  .then(() => console.log(`INFO: main: quit command received!`))
  .catch((err) => console.error(`ERROR: main: ${ err.message }`));
