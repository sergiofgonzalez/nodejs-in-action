import { Transform } from 'stream';

export class AggregateByYear extends Transform {
  constructor(options = {}) {
    options.objectMode = true;
    super(options);
    this.yearsSum = new Map();
  }

  _transform(record, encoding, cb) {
    let yearSum = this.yearsSum.get(record.year) ?? 0;
    this.yearsSum.set(record.year, ++yearSum);
    cb();
  }

  _flush(cb) {
    const sortedYears = [...this.yearsSum.keys()].sort();
    this.push(`year,num_crimes\n`);
    for (const year of sortedYears) {
      this.push(`${ year },${ this.yearsSum.get(year) }\n`);
    }
    cb();
  }
}