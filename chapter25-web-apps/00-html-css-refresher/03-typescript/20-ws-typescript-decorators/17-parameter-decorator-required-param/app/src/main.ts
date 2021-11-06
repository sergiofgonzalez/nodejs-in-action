import 'reflect-metadata';

class Teacher {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  @Validate
  getFullName(@Required title: string, suffix: string) {
    return `${ title } ${ this.name }, ${ suffix }`;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Required(target: any, propertyKey: string, parameterIndex: number) {
  if (Reflect.hasMetadata('required', target, propertyKey)) {
    const existing = Reflect.getMetadata('requires', target, propertyKey) as number[];
    Reflect.defineMetadata('required', existing.concat(parameterIndex), target, propertyKey);
  } else {
    Reflect.defineMetadata('required', [parameterIndex], target, propertyKey);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descriptor.value = function (...args: any[]) {
    if (Reflect.hasMetadata('required', target, propertyKey)) {
      const requiredParams = Reflect.getMetadata('required', target, propertyKey) as number[];
      for (const required of requiredParams) {
        if (!args[required]) {
          throw Error(`The parameter at position ${ required } is required`);
        }
      }
    }
    return original.apply(this, args);
  };
}

const teacher = new Teacher(1, 'Jason Isaacs');

try {
  console.log(teacher.getFullName('', 'PhD.'));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (err: any) {
  console.log(`ERROR: ${ err.message }`);
}