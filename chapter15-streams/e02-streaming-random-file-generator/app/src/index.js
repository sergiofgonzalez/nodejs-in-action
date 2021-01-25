"use strict";

// const { Readable } = require("stream");
const fs = require("fs");
const path = require("path");
const CsvGenerator = require("./lib/csv-generator");


generateFile("SENSOR", 15E3, "1MB");
generateFile("SENSOR", 150E3, "10MB");
generateFile("SENSOR", 1500E3, "100MB");
generateFile("SPILL", 2E3, "1MB");
generateFile("SPILL", 20E3, "10MB");
generateFile("SPILL", 200E3, "100MB");

function generateFile(recordType, numRecords, filenameSuffix) {
  console.log(`Generating file ${ recordType }-${filenameSuffix}.csv with ${ numRecords } record(s)`);
  const csvGenerator = new CsvGenerator(recordType, numRecords);
  const writable = fs.createWriteStream(path.join(__dirname, "output-data", `${ recordType }-${filenameSuffix}.csv`));
  csvGenerator.pipe(writable);
}