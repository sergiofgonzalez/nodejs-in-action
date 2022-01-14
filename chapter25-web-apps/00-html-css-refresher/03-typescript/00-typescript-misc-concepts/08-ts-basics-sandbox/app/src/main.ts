/* primitive types */
const myString: string = 'one';
const myBoolean: boolean = false;
const myNumber: number = 5;
let myVoid: void; /* const myVoid: void is not possible */
const myNull: null = null;
const myUndefined: undefined = undefined;
const myUnknown: unknown = 55;
const myAny: any = 6;
const mySymbol: unique symbol = Symbol('mySymbol');
let myNever: never; /* const myNever: never is not possible, as a never variable cannot be instantiated */
const myBigint: bigint = 5n;

/* enums */
console.log(`\n==================== enums`);
enum Keys {
  Up,
  Down,
  Left,
  Right
}

const left: Keys = Keys.Left;
console.log(`left:`, left);

enum NumericOptions {
  Option1 = 1,
  Option2 = 2,
  Option3 = 3
}

const selectedOption: NumericOptions = NumericOptions.Option2;
console.log(`selectedOption:`, selectedOption);

enum AlphaOptions {
  Option1 = 'a',
  Option2 = 'b',
  Option3 = 'c'
}

const userOption: AlphaOptions = AlphaOptions.Option2;
console.log(`userOption:`, userOption);

/* arrays */
const myArray: number[] = [1, 2, 3]; /* same type, variable size */

/* tuples */
const myTuple: [number] = [1]; /* numeric 1-tuple */
const my2dCoords: [number, number] = [3, 5]; /* numeric 2-tuple */
const myHeterogeneousTuple: [number, string, string] = [5, 'five', 'cinco'];

/* classes */
console.log(`\n==================== classes`);

class User {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}

const user = new User('Jason Isaacs');
console.log(user.getName());

class AnotherUser {
  constructor(private userName: string) {}
  get name() {
    return this.userName;
  }
}

const anotherUser = new AnotherUser('Idris Elba');
console.log(anotherUser.name);

class YetAnotherUser {
  #name: string;
  constructor(userName: string) {
    this.#name = userName;
  }
  get name() {
    return this.#name;
  }
}

const yetAnotherUser = new YetAnotherUser('Florence Pugh');
console.log(yetAnotherUser.name);

abstract class BaseApiClient {
  abstract fetch(req: any): Promise<any>; /* to be implemented in subclasses */
}

class UserApiClient extends BaseApiClient {
  fetch(req: any): Promise<any> {
      return Promise.resolve(['Jason Isaacs', 'Idris Elba', 'Florence Pugh']);
  }
}

const client = new UserApiClient();
client.fetch({url: '/users'})
  .then((users) => console.log(users));


/* interfaces and types */
console.log(`\n==================== interfaces and types`);

interface Comparable<T> {
  compareTo(o: T): number;
}

class MyNumberHolder implements Comparable<number> {
  constructor(private num: number) {}

  compareTo(o: number): number {
    if (this.num < o) {
      return -1;
    } else if (this.num > o) {
      return +1;
    } else {
      return 0;
    }
  }
}

const myNumberHolder: MyNumberHolder = new MyNumberHolder(5);
console.log(`compareTo:`, myNumberHolder.compareTo(55));


interface AppConfig {
  paths: {
    base: string;
  };
  maxRetryCount?: number;
}

const appConfig: AppConfig = {
  paths: {
    base: '/home/ubuntu'
  }
};

interface Product {
  name: string;
  price: number;
  description: string;
}

interface Order {
  orderId: string;
  amount: number;
  discount?: number;
}

type CartItem = Product & Order;

const myCartItem: CartItem = {
  name: 'Small Jar',
  price: 9.99,
  description: 'Small jar to store your favorite condiments',
  orderId: 'S0001',
  amount: 1,
  discount: 0.20
};


type Age = number | string;

function myAge(age: Age): Age {
  if (typeof age === 'number') {
    console.log(`age received was a number`);
    return age;
  } else if (typeof age === 'string') {
    console.log(`age received was a string`);
    return age;
  } else {
    return `unexpected type received: ${ typeof(age) }`;
  }
}

myAge(5);
myAge('55');
// myAge(true); // Argument of type boolean is not assignable to Age


type A = 'A';
type B = 'B';
type C = A & B;     /* resolves to never */
type D = C | 'E';   /* resolves to 'E' as C is never */

type E = {
  name: string;
}

type F = E & { age: number; };

const e: F = {
  name: 'Jason Isaacs',
  age: 54
};

/* working with input/output */
console.log(`\n==================== input/output`);

console.log(`Run the program with: echo "Hello, world" | npm start`);
const stream = process.stdin;
setImmediate(() => stream.push(null));
stream.pipe(process.stdout);

