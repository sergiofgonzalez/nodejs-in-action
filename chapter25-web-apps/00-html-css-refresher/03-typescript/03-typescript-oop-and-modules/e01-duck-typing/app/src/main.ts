import { IPerson } from './lib/person';

function printPersonInfo(person: IPerson) {
  console.log(person);
}

class Person implements IPerson {
  constructor(public id: number, public name: string, public age: number) {}
}


const person = new Person(5, 'Jason Isaacs', 55);

printPersonInfo(person);  /* explicit typing */

printPersonInfo({id: 6, name: 'Idris Elba', age: 51}); /* duck typing */