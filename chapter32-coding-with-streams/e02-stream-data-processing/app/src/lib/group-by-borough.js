import { Transform } from 'stream';

export class GroupByBorough extends Transform {
  constructor(options = {}) {
    options.objectMode = true;
    super(options);
    this.crimeDataByBorough = new Map();
  }

  _transform(record, encoding, cb) {
    const boroughMap = this.crimeDataByBorough.get(record.borough) ?? new Map();
    let boroughCrimeSum = boroughMap.get(record['major_category']) ?? 0;

    boroughMap.set(record['major_category'], ++boroughCrimeSum);
    this.crimeDataByBorough.set(record.borough, boroughMap);
    cb();
  }

  _flush(cb) {
    const sortedBoroughs = [...this.crimeDataByBorough.keys()].sort();

    // Now we need to sort each map in desc mode, per num of crimes

    this.push(`borough,crime_category,num_crimes\n`);
    for (const borough of sortedBoroughs) {
      const sortedCrimeEntries = [...this.crimeDataByBorough.get(borough).entries()].sort((itemA, itemB) => {
        if (itemA[1] > itemB[1]) {
          return -1;
        } else if (itemA[1] < itemB[1]) {
          return 1;
        } else {
          return 0;
        }
      });

      for (const [crime_category, num_crimes] of sortedCrimeEntries) {
        this.push(`${ borough },${ crime_category },${ num_crimes }\n`);
      }
    }
    cb();
  }
}