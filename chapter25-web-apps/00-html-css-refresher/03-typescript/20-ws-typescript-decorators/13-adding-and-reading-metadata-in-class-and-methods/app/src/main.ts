import 'reflect-metadata';

class Calculator {
  constructor(public first: number, public second: number) {}

  add() {
    return this.first + this.second;
  }

  subtract() {
    return this.first - this.second;
  }

  multiply() {
    return this.first * this.second;
  }

  divide() {
    return this.first / this.second;
  }
}

Reflect.defineMetadata('description', 'A class that offers common operations over two numbers', Calculator);
Reflect.defineMetadata('description', 'Returns the result of adding two numbers', Calculator, 'add');
Reflect.defineMetadata('description', 'Returns the result of subtracting two numbers', Calculator, 'subtract');
Reflect.defineMetadata('description', 'Returns the result of dividing two numbers', Calculator, 'divide');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function showDescription(target: any) {
  if (Reflect.hasMetadata('description', target)) {
    const description = Reflect.getMetadata('description', target);
    console.log(`${ target.name }: ${ description }`);
  }

  for (const methodName of Object.getOwnPropertyNames(target.prototype)) {
    if (Reflect.hasMetadata('description', target, methodName)) {
      const description = Reflect.getMetadata('description', target, methodName);
      console.log(`  ${ methodName }: ${ description }`);
    }
  }
}

showDescription(Calculator);

