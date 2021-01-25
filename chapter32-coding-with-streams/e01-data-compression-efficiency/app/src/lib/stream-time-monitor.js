import { PassThrough } from 'stream';

export class StreamTimeMonitor extends PassThrough {
  constructor(options) {
    super(options);
    this.startTime = undefined;
    this.once('data', () => {
      console.log(`StreamTimeMonitor: first chunk received at ${ new Date().getTime() }`);
      this.startTime = process.hrtime.bigint();
    });
  }

  getDuration() {
    return process.hrtime.bigint() - this.startTime;
  }
}