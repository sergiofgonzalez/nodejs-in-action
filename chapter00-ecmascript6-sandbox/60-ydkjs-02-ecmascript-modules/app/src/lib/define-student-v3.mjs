export default getName;

var records = [
  { id: 14, name: 'Jason', grade: 86 },
  { id: 73, name: 'Ellen', grade: 87 },
  { id: 112, name: 'Idris', grade: 75 },
  { id: 6, name: 'Selma', grade: 91 }
];

function getName(studentID) {
  var student = records.find(student => student.id == studentID);
  return student.name;
}