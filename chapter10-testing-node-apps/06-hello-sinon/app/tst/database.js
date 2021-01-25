"use strict";

const sinon = require("sinon");
const Database = require("../src/lib/database");
const fs = require("fs");

(() => {

  const database = new Database("./sample.json");

  const fsWriteFileSpy = sinon.spy(fs, "writeFile");
  const saveDone = sinon.spy();

  database.insert("name", "Jason Isaacs");
  database.save(saveDone);

  sinon.assert.calledOnce(fsWriteFileSpy);

  fs.writeFile.restore();
})();

(() => {
  const database = new Database("./sample.json");

  const stub = sinon.stub(fs, "writeFile").callsFake((file, data, cb) => {
    cb();
  });
  const saveDone = sinon.spy();

  database.insert("name", "Jason Isaacs");
  database.save(saveDone);

  sinon.assert.calledOnce(stub);
  sinon.assert.calledOnce(saveDone);

  fs.writeFile.restore();
})();