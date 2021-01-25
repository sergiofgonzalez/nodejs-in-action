import { Transform } from 'stream';

export class AggregateByBorough extends Transform {
  constructor(options = {}) {
    options.objectMode = true;
    super(options);
    this.boroughsSum = new Map();
  }

  _transform(record, encoding, cb) {
    let boroughSum = this.boroughsSum.get(record.borough) ?? 0;
    this.boroughsSum.set(record.borough, ++boroughSum);
    cb();
  }

  _flush(cb) {
    const boroughEntries = this.boroughsSum.entries();
    const sortedBoroughEntries = [...boroughEntries].sort((itemA, itemB) => {
      if (itemA[1] > itemB[1]) {
        return -1;
      } else if (itemA[1] < itemB[1]) {
        return 1;
      } else {
        return 0;
      }
    });


    this.push(`borough,num_crimes\n`);
    for (const entry of sortedBoroughEntries) {
      this.push(`${ entry[0] },${ entry[1] }\n`);
    }
    cb();
  }
}