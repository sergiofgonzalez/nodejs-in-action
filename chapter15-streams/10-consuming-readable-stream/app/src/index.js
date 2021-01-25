"use strict";

const { Readable } = require("stream");

class RandomStatementGenerator extends Readable {

  constructor() {
    super();
    this.current = 0;
    this.statements = [ "one", "two", "three", "catorce" ];
  }

  _read() {
    setInterval(() => {
      this.push(this.statements[this.current % this.statements.length]);
      this.current++;
    }, 1500);
  }
}


const randomStatementGenerator = new RandomStatementGenerator();

randomStatementGenerator.on("readable", () => {
  const buf = randomStatementGenerator.read();
  console.log(buf.toString("utf8"));
});