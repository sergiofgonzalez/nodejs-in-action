import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import parse from 'csv-parse';
import { AggregateByYear } from './lib/aggregate-by-year.js';
import { AggregateByBorough } from './lib/aggregate-by-borough.js';
import { GroupByBorough } from './lib/group-by-borough.js';
import { AggregateByCrime } from './lib/aggregate-by-crime.js';
import path from 'path';

const csvParser = parse({ columns: true });

const dataFile = process.argv[2] ?? 'sample_files/london_crime_by_lsoa_1000_lines.csv.gz';

const csvParsedStream = createReadStream(dataFile)
  .pipe(createGunzip())
  .pipe(csvParser);

csvParsedStream
  .pipe(new AggregateByYear())
  .pipe(createWriteStream(path.join('sample_files', 'out', 'london_crime_by_year.csv')));

csvParsedStream
  .pipe(new AggregateByBorough())
  .pipe(createWriteStream(path.join(`sample_files`, 'out', 'london_crime_by_borough.csv')));

csvParsedStream
  .pipe(new GroupByBorough())
  .pipe(createWriteStream(path.join(`sample_files`, 'out', 'london_crime_crime_type_by_borough.csv')));

csvParsedStream
  .pipe(new AggregateByCrime())
  .pipe(createWriteStream(path.join(`sample_files`, 'out', 'london_crime_by_crime_type.csv')));
