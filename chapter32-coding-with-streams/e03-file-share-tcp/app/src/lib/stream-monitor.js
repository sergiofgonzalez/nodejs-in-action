import { PassThrough } from 'stream';


export class StreamMonitor extends PassThrough {
  constructor(options) {
    super(options);
    this.startTime = null;
    this.totalBytesSent = 0;
    this.once('data', () => this.startTime = process.hrtime.bigint());
    this.on('data', (chunk) => this.totalBytesSent += chunk.length);
  }

  get duration() {
    return process.hrtime.bigint() - this.startTime;
  }

  get bytesTransferred() {
    return this.totalBytesSent;
  }
}