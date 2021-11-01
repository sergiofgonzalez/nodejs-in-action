const logger = {
  info: (message: string) => console.log(`[INFO]`, message)
};

@LogClass('Teacher instance created')
class Teacher {
  constructor(public id: number, public name: string) {
    console.log(`In Teacher's constructor`);
  }
}

const teacher = new Teacher(1, 'Jason Isaacs');


type Constructable = {
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  new(...args: any[]): {}
}

function LogClass(message: string) {
  return function <T extends Constructable>(constructor: T) {
    constructor.prototype.logger = logger;
    logger.info(message);
    return constructor;
  };
}

for (let i = 0; i < 5; i++) {
  new Teacher(i, `${ teacher }-${ i }`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>teacher).logger.info('Hello, world!');


function LogAndToken(message: string, hasToken: boolean) {
  return function <T extends Constructable>(constructor: T) {
    const augmentedConstructor = class extends constructor {
      token: boolean = hasToken;
    };
    logger.info(message);
    return augmentedConstructor;
  };
}

@LogAndToken('Student instance created', true)
class Student {
  constructor(public id: number, public name: string) {
    console.log(`In Student's constructor`);
  }
}


const student = new Student(1, 'Idris Elba');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.log(`Student instance has token?: ${ ('token' in (<any>student))? 'yes' : 'no' }, value: ${ (<any>student).token }`);


