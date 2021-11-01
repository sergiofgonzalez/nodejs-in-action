type SchoolPerson = {
  id: number,
  name: string,
  token?: boolean
}


@Token(true)
class Teacher {
  constructor(public id: number, public name: string) {}
}


function gradeExams(responsible: Teacher | Student) {
  if (isAuthorized(responsible)) {
    console.log(`${ responsible.name }: Grading exams!`);
  } else {
    console.error(`ERROR: Sorry, pal! You're not supposed to grade exams!`);
  }
}

function isAuthorized(subject: SchoolPerson) {
  return subject.token;
}

const teacher = new Teacher(1, 'Jason Isaacs');
console.log(`Does the teacher have a token?`, (<SchoolPerson>teacher)['token']);

@Token(false)
class Student {
  constructor(public id: number, public name: string) {}
}

const student = new Student(2, 'Idris Elba');
console.log(`Does the student have a token?`, (<SchoolPerson>student)['token']);

// -- we create the decorator factory for token

function Token(hasToken: boolean) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (constructor: Function) {
    constructor.prototype.token = hasToken;
  };
}

gradeExams(teacher);  // duck typing
gradeExams(student);  // duck typing
