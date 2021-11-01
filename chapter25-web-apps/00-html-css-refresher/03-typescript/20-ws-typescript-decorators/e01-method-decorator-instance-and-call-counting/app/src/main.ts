const count: Map<string, number> = new Map();



@CountClass('person-instances')
class Person {

  #title = '';
  constructor(public firstName: string, public lastName: string, public birthday: Date) {

  }

  @CountMethod('person-title')
  get title() {
    return this.#title;
  }

  set title(value: string) {
    this.#title = value;
  }

  @CountMethod('person-full-name')
  getFullName() {
    return `${ this.title } ${ this.firstName } ${ this.lastName }`;
  }

  @CountMethod('person-age')
  getAge() {
    const currentDate = new Date();
    let age = currentDate.getFullYear() - this.birthday.getFullYear() - 1;
    if (currentDate.getMonth() > this.birthday.getMonth()) {
      age++;
    } else if (currentDate.getMonth() === this.birthday.getMonth() && currentDate.getDate() >= this.birthday.getDate()) {
      age++;
    }
    return age;
  }
}

type Constructable = {
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  new(...args: any[]): {}
}

function incCounter(counterName: string) {
  if (count.has(counterName)) {
    const currentCount = count.get(counterName) ?? 0;
    count.set(counterName, currentCount + 1);
  } else {
    count.set(counterName, 1);
  }
}

function CountClass(counterName: string) {
  return function <T extends Constructable>(constructor: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wrappedConstructor: any = function (...args: any[]) {
      incCounter(counterName);
      return new constructor(...args);
    };
    wrappedConstructor.prototype = constructor.prototype;
    return wrappedConstructor;
  };
}

function CountMethod(counterName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    // instance method
    if (descriptor.value) {
      const original = descriptor.value;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      descriptor.value = function (...args: any[]) {
        incCounter(counterName);
        return original.apply(this, args);
      };
    }

    // getter
    if (descriptor.get) {
      const original = descriptor.get;
      descriptor.get = function () {
        incCounter(counterName);
        return original.apply(this, []);
      };
    }

    // setter
    if (descriptor.set) {
      const original = descriptor.set;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      descriptor.set = function (value: any) {
        incCounter(counterName);
        return original.apply(this, [value]);
      };
    }
  };
}




const me = new Person('Sergio', 'Gonzalez', new Date('2020-10-30'));
me.title = 'Mr.';
console.log(`Hello, ${ me.getFullName() }!`);
console.log(`You're ${ me.getAge() } years old`);
console.log(count);

const her = new Person('Inma', 'Balboa', new Date('1969-12-06'));
me.title = 'Ms.';
console.log(`She's ${ her.getAge() } years old`);
console.log(count);