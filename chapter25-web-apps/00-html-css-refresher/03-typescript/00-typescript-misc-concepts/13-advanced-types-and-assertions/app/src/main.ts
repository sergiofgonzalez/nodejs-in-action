/* keyof: capturing the keys of a type */

interface SignUpFormState {
  email: string;
  name: string;
}

interface ActionPayload {
  key: keyof SignUpFormState;
  value: string;
}

const update1: ActionPayload = {
  key: 'email',   // key is 'name' | 'email'
  value: 'jason.isaacs@example.com'
};

const person = {
  name: 'Jason Isaacs',
  age: 54,
  profession: 'actor'
};

type PersonKeys = keyof typeof person;

const personKey: PersonKeys = 'profession'; // type is 'name' | 'age' | 'profession'

/* Unique branded types: enabling nominal types */

// structural typing
type Point2D = { x: number, y: number };

function distance(first: Point2D, second: Point2D) {
  return Math.sqrt(Math.pow(first.x - second.x, 2) + Math.pow(first.x - second.x, 2));
}

console.log(`distance:`, distance({ x: 1, y: 2}, {x: 3, y: 4}));

// nominal typing
type NominalTyped<Type, Brand> = Type & { __type: Brand }

type NominalPoint2D = NominalTyped<Point2D, 'Point2D'>;

function distanceBranded(first: NominalPoint2D, second: NominalPoint2D) {
  return Math.sqrt(Math.pow(first.x - second.x, 2) + Math.pow(first.x - second.x, 2));
}

// distanceBranded({ x: 1, y: 2}, {x: 3, y: 4}); // ERROR!

const p1 = { x: 1, y: 2 } as NominalPoint2D;
const p2 = { x: 3, y: 4 } as NominalPoint2D;

console.log(`distance:`, distanceBranded(p1, p2));

/* Conditional types */

type UserID = {
  id: string;
}

type NameOrIdNumber<T extends string | number> = T extends number ? UserID : string;

const loginInfo: NameOrIdNumber<1> = {
  id: '123'
};

const loginInfo2: NameOrIdNumber<'a'> = 'jason.isaacs';


// infer with conditional types
interface Box<T> {
  value: T
}

type Unbox<A> = A extends Box<infer T> ? T : A;

const boxedNum: Box<number> = { value: 10 };

type unboxedNum2 = Unbox<typeof boxedNum>;      // type is a number
type unboxedNum = Unbox<{ value: 10 }>;         // type is a number
type unboxedString = Unbox<{ value: 'Hello!' }> // type is a string
type unboxedBoolean = Unbox<true>;              // type is boolean