import { createReadStream } from 'fs';
import { createGunzip } from 'zlib';
import parse from 'csv-parse';
import { FilterByCountry } from './lib/filter-by-country.js';
import { SumProfit } from './lib/sum-profit.js';
// import { monitor } from './lib/monitor.js';

const csvParser = parse({ columns: true });

createReadStream('data/data.csv.gz')        // read file in streaming mode
  .pipe(createGunzip())                     // gunzip the chunks
  // .pipe(monitor)
  .pipe(csvParser)                          // parse the chunks as csv records
  .pipe(new FilterByCountry('Italy'))       // filter records with country='Italy'
  .pipe(new SumProfit())                    // reduce profit in filtered records
  .pipe(process.stdout);                    // stream to standard output
