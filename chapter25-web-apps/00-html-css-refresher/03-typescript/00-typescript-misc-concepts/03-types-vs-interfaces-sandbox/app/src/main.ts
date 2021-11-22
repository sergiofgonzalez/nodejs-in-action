/* interfaces support declaration merging */
interface ToDo {
  title: string;
}

interface ToDo {
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const task: ToDo = {
  title: 'Learn TypeScript',
  description: 'Read documentation about TS and practice'
};

/* types do not support declaration merging */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ToDoType = {
  title: string;
}

// type ToDoType = { description: string; } // ERR: duplicate identifier

/* extends and implements */
class Car {
  printCar = () => {
    console.log('This is my car');
  };
}

interface NewCar extends Car {
  name: string;
}

class NewestCar implements NewCar {

  constructor(public name: string, public engine: string) { }

  printCar() {
    console.log(`This is my car: ${ this.name } with a ${ this.engine }`);
  }
}

console.log(`=== extends and implement`);
const myCar = new NewestCar('Merc', 'V8');
myCar.printCar();

/* type intersection */
type Name = {
  name: string
}

type Age = {
  age: number
}

type Person = Name & Age;

const p: Person = {
  name: 'Jason Isaacs',
  age: 57
};

console.log(`\n=== type intersection`);
console.log(p);

// you can also intersect two interfaces into a new type
interface IName {
  name: string
}

interface IAge {
  age: number
}

type PersonFromInterface = IName & IAge;

const p1: PersonFromInterface = {
  name: 'Idris Elba',
  age: 49
};

console.log(p1);

/* type unions */
type Man = {
  nameOfTheMan: string,
  age: number
}

type Woman = {
  nameOfTheWoman: string
  age: number
}

type Human = Man | Woman;

const p2: Human = {
  nameOfTheWoman: 'Margot Robbie',
  age: 32
};

const p3: Human = {
  nameOfTheMan: 'Jason Isaacs',
  age: 57
};

console.log(`\n=== type union`);
console.log(p2);
console.log(p3);

// with interfaces
interface IMan {
  nameOfTheMan: string,
  age: number
}

interface IWoman {
  nameOfTheWoman: string,
  age: number
}

type HumanFromInterfaces = IMan | IWoman;

const p4: HumanFromInterfaces = {
  nameOfTheWoman: 'Florence Pugh',
  age: 28
};

console.log(p4);

/* tuples */

type Response = [number, string, string];

const notFound: Response = [404, 'Not Found', 'The requested resource was not found in the server'];

console.log(`\n=== tuples`);
console.log(notFound);

// used in interfaces
interface IResponse {
  details: [number, string, string]
}

const internalServerError: IResponse = {
  details: [500, 'Internal Server Error', 'The request failed to be processed in the system']
};

console.log(internalServerError);

/* using types in standalone functions */

type TeamMember = {
  name: string,
  experience: number
}

type TeamMemberReturnFn = (t: TeamMember) => TeamMember;

const returnPerson: TeamMemberReturnFn = (t) => {
  return t;
};

console.log(`\n=== using types in standalone functions`);
console.log(returnPerson({ name: 'Vinoth' , experience: 8 }));