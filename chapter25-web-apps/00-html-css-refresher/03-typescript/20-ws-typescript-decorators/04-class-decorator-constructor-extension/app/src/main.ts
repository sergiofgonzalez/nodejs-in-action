type Constructable = {
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  new(...args: any[]): {}
}

function Token(hasToken: boolean) {
  return function <T extends Constructable>(constructor: T) {
    return class extends constructor {
      token: boolean = hasToken;
      // console.log('aug'); // ERR: unexpected keyword or identifier
    };
  };
}


@Token(true)
class Teacher {
  constructor(public id: number, public name: string) {
    console.log(`Constructing Teacher instance`);
  }
}

@Token(false)
class Student {
  constructor(public id: number, public name: string) {
    console.log(`Constructing Student instance`);
  }
}

class Groundskeeper {
  constructor(public id: number, public name: string) {
    console.log(`Constructing Groundskeeper instance`);
  }
}

const krabappel = new Teacher(1, 'Edna Krabappel');
const nelson = new Student(2, 'Nelson Muntz');
const willie = new Groundskeeper(3, 'Willie MacDougal');

type SchoolPersona = {
  id: number,
  name: string,
  token?: boolean
}

console.log(`Teacher '${ krabappel.name }' instance has token?: ${ ('token' in <SchoolPersona>krabappel)? 'yes' : 'no' }, value: ${ (<SchoolPersona>krabappel).token }`);
console.log(`Student '${ nelson.name } instance has token?: ${ ('token' in <SchoolPersona>nelson)? 'yes' : 'no' }, value: ${ (<SchoolPersona>nelson).token }`);
console.log(`Groundskeeper '${ willie.name }' instance has token?: ${ ('token' in <SchoolPersona>willie)? 'yes' : 'no' }, value: ${ (<SchoolPersona>willie).token }`);
