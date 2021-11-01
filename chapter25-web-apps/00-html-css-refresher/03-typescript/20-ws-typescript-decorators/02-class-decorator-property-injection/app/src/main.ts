// eslint-disable-next-line @typescript-eslint/ban-types
function Token(constructor: Function) {
  constructor.prototype.token = true;
}

@Token
class Teacher {
  constructor(public id: number, public name: string) {}
}

const myTeacher = new Teacher(1, 'Jason Isaacs');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.log(`token: ${ (<any>myTeacher).token }` );