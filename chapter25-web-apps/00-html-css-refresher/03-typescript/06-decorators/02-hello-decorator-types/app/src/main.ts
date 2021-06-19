/* Class Decorator */

// eslint-disable-next-line @typescript-eslint/ban-types
function classDecorator(constructor: Function) {
  constructor.prototype.addedProperty = 'added property value';
}


@classDecorator
class MyDecoratedClass {
  constructor(public id: number) { }
}

const myObj = new MyDecoratedClass(55);
console.log((<any>myObj).addedProperty);


/* (instance) Property Decorator */
function propertyDecorator(target: any, propertyName: string) {
  console.log(`target:`, target);
  console.log(`target.constructor:`, target.constructor);
  console.log(`propertyName:`, propertyName);
  target[propertyName] = 'Hello to Jason Isaacs!';
  target.constructor.prototype.addedProperty = 'value for added property';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MyClassWithDecoratedProperty {
  @propertyDecorator
  firstName: string | undefined;
}

const myObj2 = new MyClassWithDecoratedProperty();
console.log(myObj2);
console.log(myObj2.firstName);
console.log((<any>myObj2).addedProperty);


/* static property decorator */
function staticPropertyDecorator(target: any, propertyName: string) {
  console.log(`target:`, target);
  console.log(`typeof target:`, typeof target);
  console.log(`propertyName:`, propertyName);
  target[propertyName] = 'foobar';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MyClassWithDecoratedStaticProperty {
  @staticPropertyDecorator static staticProperty: string;
}

console.log(MyClassWithDecoratedStaticProperty.staticProperty);

/* static property decorator */
function dualPropertyDecorator(target: any, propertyName: string) {
  if (typeof target === 'function') {
    console.log(`static property decorator logic`);
    target[propertyName] = 'static';
  } else if (typeof target === 'object') {
    console.log(`instance property decorator logic`);
    target[propertyName] = 'instance';
  } else {
    throw new Error('Unexpected!');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MyClassWithDecoratedProperties {
  @dualPropertyDecorator static staticProperty: string;
  @dualPropertyDecorator message: string | undefined;
}

console.log(MyClassWithDecoratedProperties.staticProperty);
const obj3 = new MyClassWithDecoratedProperties();
console.log(obj3.message);

/* Method decorator */
function methodDecorator(target: any, methodName: string, descriptor?: PropertyDescriptor) {
  console.log(`target:`, target);
  console.log(`methodName:`, methodName);
  console.log(`descriptor:`, descriptor);
  console.log(`target[methodName]:`, target[methodName]);

  const originalFn = target[methodName];

  const newFn = function (this: any) {
    console.log(`The original function has been owned!`);
    // eslint-disable-next-line prefer-rest-params
    for (const arg of arguments) {
      console.log(`original function called with arg:`, arg);
    }
    originalFn.apply(this, ['Hello to Jason Isaacs!']);
  };

  target[methodName] = newFn;
  return target;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MyClassWithDecoratedMethod {
  @methodDecorator
  print(message: string) {
    console.log(`message:`, message);
  }
}

const obj4 = new MyClassWithDecoratedMethod();
obj4.print('Hello, world!');

/* Parameter decorator */
function parameterDecorator(target: any, methodName: string, parameterIndex: number) {
  console.log(`target:`, target);
  console.log(`methodName:`, methodName);
  console.log(`parameterIndex:`, parameterIndex);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MyClassWithDecoratedParameter {
  print(@parameterDecorator message: string) {
    console.log(message);
  }
}