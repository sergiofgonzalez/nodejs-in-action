import 'reflect-metadata';

@AuditClass()
class Teacher {
  #title = '';

  constructor(public name: string) {}

  @AuditMethod()
  get title() {
    return this.#title;
  }

  set title(value: string) {
    this.#title = value;
  }

  @AuditMethod()
  teach() {
    console.log(`${ this.name } is teaching!`);
  }
}

type Constructable = {
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  new (...args: any[]): {}
}

function AuditClass() {
  return function <T extends Constructable>(constructor: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wrappedConstructor: any = function (...args: any[]) {
      if (Reflect.hasMetadata('instance-count', wrappedConstructor)) {
        const currValue = Reflect.getMetadata('instance-count', wrappedConstructor);
        Reflect.defineMetadata('instance-count', currValue + 1, wrappedConstructor);
      } else {
        Reflect.defineMetadata('instance-count', 1, wrappedConstructor);
      }
      return new constructor(...args);
    };
    wrappedConstructor.prototype = constructor.prototype;
    return wrappedConstructor;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function incCallCount(target: any, propertyName: string) {
  if (Reflect.hasMetadata('call-count', target.constructor, propertyName)) {
    const currValue = Reflect.getMetadata('call-count', target.constructor, propertyName);
    Reflect.defineMetadata('call-count', currValue + 1, target.constructor, propertyName);
  } else {
    Reflect.defineMetadata('call-count', 1, target.constructor, propertyName);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function incInstanceCallCount(obj: any, propertyName: string) {
  if (Reflect.hasMetadata('call-count', obj, propertyName)) {
    const currValue = Reflect.getMetadata('call-count', obj, propertyName);
    Reflect.defineMetadata('call-count', currValue + 1, obj, propertyName);
  } else {
    Reflect.defineMetadata('call-count', 1, obj, propertyName);
  }
}

function AuditMethod() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    // instance method
    if (descriptor.value) {
      const original = descriptor.value;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      descriptor.value = function (...args: any[]) {
        incCallCount(target, propertyName);
        incInstanceCallCount(this, propertyName);
        return original.apply(this, args);
      };
    }

    // getter
    if (descriptor.get) {
      const original = descriptor.get;
      descriptor.get = function () {
        incCallCount(target, propertyName);
        incInstanceCallCount(this, propertyName);
        return original.apply(this, []);
      };
    }

    // setter
    if (descriptor.set) {
      const original = descriptor.set;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      descriptor.set = function (value: any) {
        incCallCount(target, propertyName);
        incInstanceCallCount(this, propertyName);
        return original.apply(this, [value]);
      };
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function showInstanceCount(target: any) {
  if (Reflect.hasMetadata('instance-count', target)) {
    const instanceCountValue = Reflect.getMetadata('instance-count', target);
    console.log(`${ target.name } instance count: ${ instanceCountValue }`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function showMethodInvocationCount(target: any) {
  for (const methodName of Object.getOwnPropertyNames(target.prototype)) {
    if (Reflect.hasMetadata('call-count', target.prototype.constructor, methodName)) {
      const callCountValue = Reflect.getMetadata('call-count', target.prototype.constructor, methodName);
      console.log(`${ methodName } call count: ${ callCountValue }`);
    } else {
      console.log(`${ methodName } call count: no data available`);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function showInstanceMethodInvocationCount(obj: any) {
  for (const methodName of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))) {
    if (Reflect.hasMetadata('call-count', obj, methodName)) {
      const callCountValue = Reflect.getMetadata('call-count', obj, methodName);
      console.log(`${ methodName } call count for this instance: ${ callCountValue }`);
    } else {
      console.log(`${ methodName } call count for this instance: no data available`);
    }
  }
}


const teacher1 = new Teacher('Jason Isaacs');
const teacher2 = new Teacher('Idris Elba');
const teacher3 = new Teacher('Florence Pugh');
showInstanceCount(Teacher);

teacher1.teach();
showMethodInvocationCount(Teacher);

teacher3.teach();
showMethodInvocationCount(Teacher);
showInstanceMethodInvocationCount(teacher3);