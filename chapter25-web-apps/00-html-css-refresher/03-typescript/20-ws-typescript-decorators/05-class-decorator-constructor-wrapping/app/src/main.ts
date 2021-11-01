type Constructable = {
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  new(...args: any[]): {}
}

function WrapConstructor(message: string) {
  return function <T extends Constructable>(constructor: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wrappedConstructor: any = function (...args: any[]) {
      console.log(` >> Decorating the class with ${ message }`);
      const result = new constructor(...args);
      console.log(` >> The underlying constructor has been executed`);
      return result;
    };
    wrappedConstructor.prototype = constructor.prototype;
    return wrappedConstructor;
  };
}

@WrapConstructor('decorator')
class Teacher {
  constructor(public id: number, public name: string) {
    console.log(`In Teacher's constructor`);
  }
}

const teacher = new Teacher(1, 'Jason Isaacs');