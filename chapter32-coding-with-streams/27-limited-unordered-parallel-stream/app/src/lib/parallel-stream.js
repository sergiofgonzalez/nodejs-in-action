import { Transform } from 'stream';

export class ParallelStream extends Transform {
  constructor(concurrency, userTransform, options) {
    super({ objectMode: true, ...options });
    this.concurrency = concurrency;
    this.userTransform = userTransform;
    this.running = 0;
    this.continueCb = null;
    this.terminateCb = null;
  }

  _transform(chunk, encoding, done) {
    this.running++;
    this.userTransform(chunk, encoding, this.push.bind(this), this._onComplete.bind(this));
    if (this.running < this.concurrency) {
      done();
    } else {
      this.continueCb = done;
    }
  }

  _flush(done) {
    if (this.running > 0) {
      this.terminateCb = done;
    } else {
      done();
    }
  }

  _onComplete(err) {
    this.running--;
    if (err) {
      return this.emit('error', err);
    }
    const tmpCb = this.continueCb;
    this.continueCb = null;
    tmpCb && tmpCb();
    if (this.running === 0) {
      this.terminateCb && this.terminateCb();
    }
  }
}