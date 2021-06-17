import { Module1 } from './module1';
import { Module2 as MyModule } from './lib/module2';
// import { ComplexLibraryClass1, ComplexLibraryClass2 } from './lib/complex-library/complex-library';
import * as ComplexLibraryExports from './lib/complex-library/complex-library';
// import addFunction from './lib/module3';
import addFunction,  { substract } from './lib/module3';


const module1 = new Module1();
module1.print();

const myModule = new MyModule();
myModule.print();

const complexLibClass1 = new ComplexLibraryExports.ComplexLibraryClass1();
const complexLibClass2 = new ComplexLibraryExports.ComplexLibraryClass2();

complexLibClass1.print();
complexLibClass2.print();

console.log(addFunction(5, 3));
console.log(substract(5, 3));