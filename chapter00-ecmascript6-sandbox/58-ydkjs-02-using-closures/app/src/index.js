'use strict';

/* Example 1: function that returns a function that lets you greet a student */
function lookupStudent(studentID) {
  var students = [
    { id: 14, name: 'Jason' },
    { id: 73, name: 'Elizabeth' },
    { id: 112, name: 'Tom' },
    { id: 6, name: 'Ingrid' }
  ];

  return function greetStudent(greeting) {
    var student = students.find(student => student.id == studentID);

    return `${ greeting }, ${ student.name }!`;
  };
}

var chosenStudents = [
  lookupStudent(6),
  lookupStudent(73)
];

console.log(`chosenStudents[0].name = ${ chosenStudents[0].name }`);

console.log(`chosenStudents[0]('Hello') = ${ chosenStudents[0]('Hello') }`);
console.log(`chosenStudents[1]('Howdy') = ${ chosenStudents[1]('Howdy') }`);
console.log(`\n`);

/* Example 2: the classic added function to illustrates closures */
function adder(num1) {
  return function addTo(num2) {
    return num1 + num2;
  };
}

var add10To = adder(10);
var add42To = adder(42);

console.log(`add10To(15) = ${ add10To(15) }`);
console.log(`add42To(9) = ${ add42To(9) }`);
console.log(`\n`);

/* Example 3: password management function to illustrate that closures maintain a live link */
function passwordManager(initialPassword) {
  var currentPassword = initialPassword;

  return {
    validatePassword: password => password == currentPassword,
    resetPassword: (password, newPassword) => {
      if (password == currentPassword) {
        currentPassword = newPassword;
      } else {
        console.log(`ERROR: current password do not match`);
      }
    }
  };
}

var myPasswordManager = passwordManager('secret');
console.log(`myPasswordManager.validatePassword('1234') = ${ myPasswordManager.validatePassword('1234') }`);
console.log(`myPasswordManager.validatePassword('secret') = ${ myPasswordManager.validatePassword('secret') }`);

myPasswordManager.resetPassword('secret', 'p4ssw0rd');
console.log(`myPasswordManager.validatePassword('1234') = ${ myPasswordManager.validatePassword('1234') }`);
console.log(`myPasswordManager.validatePassword('secret') = ${ myPasswordManager.validatePassword('secret') }`);
console.log(`myPasswordManager.validatePassword('p4ssw0rd') = ${ myPasswordManager.validatePassword('p4ssw0rd') }`);
console.log('\n');

/* Example 4: Another example for the live link */
function makeCounter() {
  var count = 0;
  return function getCurrent() {
    count = count + 1;
    return count;
  };
}

const hits = makeCounter();

console.log(`hits() = ${ hits() }`);
console.log(`hits() = ${ hits() }`);
console.log(`hits() = ${ hits() }`);
console.log('\n');

/* Example 5: closures cannot be used to freeze values of variables */
var studentName = 'Idris';

var greeting = function hello() {
  console.log(`Hello, ${ studentName }`);  // this is closing over studentName, not to 'Idris'
};

greeting();
studentName = 'Tom';
greeting();
console.log(`\n`);

/* Example 6: another example of why closures are a bad idea to freeze variables */
var keeps = [];
for (var i = 0; i < 3; i++) {
  keeps[i] = function freezeIndexValue() {
    return i;
  };
}

console.log(`keeps[0]() = ${ keeps[0]() }`);
console.log(`keeps[1]() = ${ keeps[1]() }`);
console.log(`keeps[2]() = ${ keeps[2]() }`);

var keeps2 = [];
for (var i2 = 0; i2 < 3; i2++) {
  let j = i2;
  keeps2[i2] = function freezeIndexValue() {
    return j;
  };
}

console.log(`\nkeeps2[0]() = ${ keeps2[0]() }`);
console.log(`keeps2[1]() = ${ keeps2[1]() }`);
console.log(`keeps2[2]() = ${ keeps2[2]() }`);

var keeps3 = [];
for (let i = 0; i < 3; i++) {
  keeps3[i] = function freezeIndexValue() {
    return i;
  };
}

console.log(`\nkeeps3[0]() = ${ keeps3[0]() }`);
console.log(`keeps3[1]() = ${ keeps3[1]() }`);
console.log(`keeps3[2]() = ${ keeps3[2]() }`);
console.log(`\n`);

/* Example 7: understanding if closure is per scope or per variable */

function manageStudentGrades(studentRecords) {
  var grades = studentRecords.map(getGrade);
  return addGrade;

  function getGrade(record) {
    return record.grade;
  }

  function sortAndTrimGradesList() {
    grades.sort(function desc(g1, g2) {
      return g2 - g1;
    });
    grades = grades.slice(0, 10); // keep only top 10 grades
  }

  function addGrade(newGrade) {
    grades.push(newGrade);
    sortAndTrimGradesList();
    return grades;
  }
}

var addNextGrade = manageStudentGrades([
  { id: 14, name: 'Jason', grade: 86 },
  { id: 73, name: 'Ingrid', grade: 87 },
  { id: 112, name: 'Idris', grade: 75 },
  { id: 6, name: 'Sarah', grade: 91 }
]);

console.log(addNextGrade(81));  // [ 91, 87, 86, 81, 75 ]
console.log(addNextGrade(68));  // [ 91, 87, 86, 81, 75, 68 ]
