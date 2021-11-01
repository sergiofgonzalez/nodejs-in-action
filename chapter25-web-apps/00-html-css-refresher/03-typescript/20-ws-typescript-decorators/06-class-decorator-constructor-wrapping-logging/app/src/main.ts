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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loggingConstructor: any = function (...args: any[]) {
      logger.info(message);
      return new constructor(...args);
    };
    loggingConstructor.prototype = constructor.prototype;
    return loggingConstructor;
  };
}

for (let i = 0; i < 5; i++) {
  new Teacher(i, `${ teacher }-${ i }`);
}

