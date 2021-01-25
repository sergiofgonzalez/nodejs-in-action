import { createReadStream } from 'fs';
import { createGunzip } from 'zlib';
import parse from 'csv-parse';
import { AggregateByYear } from './lib/aggregate-by-year.js';
import { AggregateByBorough } from './lib/aggregate-by-borough.js';
import { GroupByBorough } from './lib/group-by-borough.js';
import { AggregateByCrime } from './lib/aggregate-by-crime.js';
import { pipeline } from 'stream';

const csvParser = parse({ columns: true });

const dataFile = process.argv[2] ?? 'sample_files/london_crime_by_lsoa_1000_lines.csv.gz';

// Aggregate by year
pipeline(
  createReadStream(dataFile),
  createGunzip(),
  csvParser,
  new AggregateByYear(),
  process.stdout,
  (err) => {
    if (err) {
      console.error(`ERROR: main: could not complete 'aggregation by year' pipeline: ${ err.message }`);
      process.exit(1);
    }
    console.log(`INFO: 'Aggregation by year' done!`);
  }
);

/*
// Aggregate by borough
pipeline(
  createReadStream(dataFile),
  createGunzip(),
  csvParser,
  new AggregateByBorough(),
  process.stdout,
  (err) => {
    if (err) {
      console.error(`ERROR: main: could not complete 'aggregation by year' pipeline: ${ err.message }`);
      process.exit(1);
    }
    console.log(`INFO: 'Aggregation by year' done!`);
  }
);

// Group by Borough, Aggregate by crime category
pipeline(
  createReadStream(dataFile),
  createGunzip(),
  csvParser,
  new GroupByBorough(),
  process.stdout,
  (err) => {
    if (err) {
      console.error(`ERROR: main: could not complete 'aggregation by year' pipeline: ${ err.message }`);
      process.exit(1);
    }
    console.log(`INFO: 'Aggregation by year' done!`);
  }
);

// Aggregate by crime
pipeline(
  createReadStream(dataFile),
  createGunzip(),
  csvParser,
  new AggregateByCrime(),
  process.stdout,
  (err) => {
    if (err) {
      console.error(`ERROR: main: could not complete 'aggregation by year' pipeline: ${ err.message }`);
      process.exit(1);
    }
    console.log(`INFO: 'Aggregation by year' done!`);
  }
);
*/