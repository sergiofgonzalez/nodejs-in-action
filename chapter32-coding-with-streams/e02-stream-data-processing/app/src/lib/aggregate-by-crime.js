import { Transform } from 'stream';

export class AggregateByCrime extends Transform {
  constructor(options = {}) {
    options.objectMode = true;
    super(options);
    this.crimesSum = new Map();
  }

  _transform(record, encoding, cb) {
    let crimesSum = this.crimesSum.get(record['major_category']) ?? 0;
    this.crimesSum.set(record['major_category'], ++crimesSum);
    cb();
  }

  _flush(cb) {
    const boroughCrimes = this.crimesSum.entries();
    const sortedBoroughCrimes = [...boroughCrimes].sort((itemA, itemB) => {
      if (itemA[1] > itemB[1]) {
        return -1;
      } else if (itemA[1] < itemB[1]) {
        return 1;
      } else {
        return 0;
      }
    });
    this.push(`crime_category,num_crimes\n`);
    for (const [crime_category, num_crimes] of sortedBoroughCrimes) {
      this.push(`${ crime_category },${ num_crimes }\n`);
    }
    cb();
  }
}