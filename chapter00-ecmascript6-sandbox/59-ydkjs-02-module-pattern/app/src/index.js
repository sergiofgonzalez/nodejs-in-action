'use strict';

/* Example 1: the "revealing module" */
var Student = (function defineStudent(){
  var records = [
    { id: 14, name: 'Jason', grade: 86 },
    { id: 73, name: 'Ellen', grade: 87 },
    { id: 112, name: 'Idris', grade: 75 },
    { id: 6, name: 'Selma', grade: 91 }
  ];

  var publicAPI = {
    getName
  };

  return publicAPI;


  function getName(studentID) {
    var student = records.find(student => student.id == studentID);
    return student.name;
  }
})();

console.log(Student.getName(73));

/* Example 2: Module factories */
function defineStudentFactory() {
  var records = [
    { id: 14, name: 'Jason', grade: 86 },
    { id: 73, name: 'Ellen', grade: 87 },
    { id: 112, name: 'Idris', grade: 75 },
    { id: 6, name: 'Selma', grade: 91 }
  ];

  var publicAPI = {
    getName
  };

  return publicAPI;


  function getName(studentID) {
    var student = records.find(student => student.id == studentID);
    return student.name;
  }
}

var defineStudent = defineStudentFactory();
console.log(defineStudent.getName(73));

/* Example 3: Node.js CommonJS modules */
const defineStudentModule = require('./lib/define-student'); // exported as module.exports.getName = getName;
console.log(defineStudentModule.getName(73));
