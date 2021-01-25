# e02-streaming-random-file-generator
> creating files with some random contents using Node.js streams

## Description
A very simple application that generates some files with different number of records, format and sizes using an async approach using streams, which does not require the file contents to be materialized and therefore is perfect for generating really large files.

The heavy lifting is performed by the `CsvGenerator` module, which extends from `Readable` and implements a `_read` method that pushes a record when called until the configured number of records to supply is reached:
```javascript
  async _read() {
    if (this.numRecordsGenerated > this.numRecords) {
      this.push(null);
    } else {
      const csvRecord = await this._getRandomCsvRecord();
      this.push(`${ csvRecord }\n`);
      this.numRecordsGenerated++;      
      if (this.numRecordsGenerated % 1000 === 0) {
        console.log(`${ this. recordType } : ${ this.numRecordsGenerated }`);
      }      
    }
  }
```

Then in the main program, a function is defined to instantiate an object of this class, create a `WriteStream` in which the data will be written to disk and a *pipe* between the generator of CSV records and the stream is established.

```javascript
function generateFile(recordType, numRecords, filenameSuffix) {
  console.log(`Generating file ${ recordType }-${filenameSuffix}.csv with ${ numRecords } record(s)`);
  const csvGenerator = new CsvGenerator(recordType, numRecords);
  const writable = fs.createWriteStream(path.join(__dirname, "output-data", `${ recordType }-${filenameSuffix}.csv`));
  csvGenerator.pipe(writable);
}
```

**NOTE**
For a tool the generates the same types of files, by using Node's file API instead of streams see [e02-random-file-generator](../../chapter16-fs/e02-random-file-generator/).