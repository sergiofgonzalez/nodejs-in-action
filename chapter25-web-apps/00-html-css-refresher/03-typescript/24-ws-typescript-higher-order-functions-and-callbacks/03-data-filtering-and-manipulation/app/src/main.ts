import { studentsJson } from './lib/students';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  graduationYear: number;
  score: number;
}

const students: Student[] = JSON.parse(studentsJson);

/* expanded version */
// function getAverageScoreOf2010Students(students: Student[]): number {
//   const relevantStudents = students.filter(student => student.graduationYear === 2010);
//   const relevantStudentsScores = relevantStudents.map(student => student.score);
//   const totalScore = relevantStudentsScores.reduce((accTtotal, score) => accTtotal + score, 0);
//   return totalScore / relevantStudentsScores.length;
// }

/* concise version */
function getAverageScoreOf2010Students(students: Student[]): number {
  type ScoreTuple = [number, number]; /* num items, total */

  const totalScoreTuple: ScoreTuple = students
    .filter(student => student.graduationYear === 2010)
    .map(student => student.score)
    .reduce((accTotal, score) => [accTotal[0] + 1, accTotal[1] + score], [0, 0]);
  return totalScoreTuple[1] / totalScoreTuple[0];
}

console.log(getAverageScoreOf2010Students(students));