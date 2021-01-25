'use strict';

const data = require('./lib/reef-data');
const generateReport = require('./lib/generate-report');

const report = generateReport(data);

console.log(`Number of rows: ${ report.numRows }`);
console.log(`Number of columns: ${ report.numColumns }`);
console.log(`Columns: ${ report.columnNames.join(', ') }`);