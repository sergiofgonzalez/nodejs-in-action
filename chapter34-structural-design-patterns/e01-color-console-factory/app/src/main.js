import { createColorConsole } from './lib/create-color-console.js';

const blueConsole = createColorConsole('blue');
const greenConsole = createColorConsole('green');
const RedConsole = createColorConsole('red');


blueConsole.log(`This is blue!`);
greenConsole.log(`This is green!`);
RedConsole.log(`This is red!`);

const name = 'Jason Isaacs';
greenConsole.log(`Hello to ${ name }!!!`);

blueConsole.log(`Hello to `, name); // this won't work as console.log
console.log(`Hello to`, name);