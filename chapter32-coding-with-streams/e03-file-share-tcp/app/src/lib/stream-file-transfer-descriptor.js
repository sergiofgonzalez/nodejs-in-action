import { Readable } from 'stream';

class StreamFileTransfer extends Readable {
  constructor(filename, options) {
    super(options);
    this.filename = filename + '\0';
    this.push(this.filename, 'utf8');
  }

  _read()
}