class Profiler {
  constructor(label) {
    this.label = label;
    this.lastTime = null;
  }

  start() {
    this.lastTime = process.hrtime.bigint();
  }

  end() {
    const diff = process.hrtime.bigint() - this.lastTime;
    console.log(`Timer '${ this.label }' took ${ diff } nanos`);
  }
}

/* duck typing! */
const noopProfiler = {
  start() {},
  end() {}
};

export function createProfiler(label) {
  if (process.env.NODE_ENV === 'production') {
    return noopProfiler;
  }

  return new Profiler(label);
}