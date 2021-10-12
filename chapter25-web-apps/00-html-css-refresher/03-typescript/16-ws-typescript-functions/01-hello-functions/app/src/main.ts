const values = [8, 42, 99, 161];

let startTs = process.hrtime.bigint();
let total = 0;
for (let i = 0; i < values.length; i++) {
  total += values[i];
}

const average = total / values.length;

console.log(average);

const squareDiffs = [];
for (let i = 0; i < values.length; i++) {
  const diff = values[i] - average;
  squareDiffs.push(diff ** 2);
}

total = 0;
for (let i = 0; i < values.length; i++) {
  total += squareDiffs[i];
}
const standardDeviation = Math.sqrt(total / squareDiffs.length);
console.log(standardDeviation);
console.log(`process took: ${ process.hrtime.bigint() - startTs } nanos`);

// ...and now, for something completely different
console.log(`======`);
startTs = process.hrtime.bigint();
const calcAverage = (values: number[]): number =>
  values.reduce((prev, curr) => prev + curr, 0) / values.length;

const calcStandardDeviation = (values: number[]): number => {
  const average = calcAverage(values);
  const squareDiffs = values.map((value) => (value - average) ** 2);
  return Math.sqrt(calcAverage(squareDiffs));
};

console.log(calcAverage(values));
console.log(calcStandardDeviation(values));
console.log(`process took: ${ process.hrtime.bigint() - startTs } nanos`);