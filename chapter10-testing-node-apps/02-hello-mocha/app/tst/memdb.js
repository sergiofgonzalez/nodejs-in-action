"use strict";

const memdb = require("../src/lib/memdb");
const assert = require("assert");


describe("memdb", () => {
  beforeEach(() => {
    memdb.clear();
  });


  describe(".save(doc) (sync mode)", () => {
    it("should save the document", () => {
      const pet = { name: "Ciro" };
      memdb.save(pet);
      const ret = memdb.first({ name: "Ciro" });
      assert(ret === pet);
    });
  });

  describe(".first(obj)", () => {
    it("should return the first matching doc", () => {
      const truhan = { name: "Truhan"};
      const ciro = { name: "Ciro" };
      memdb.save(truhan);
      memdb.save(ciro);

      const ret = memdb.first({ name: "Truhan" });
      assert (ret === truhan);
    });

    it("should return null/undefined when no doc matches", () => {
      const ret = memdb.first({ name: "Lupita" });
      assert(ret == null);
    });
  });

  describe(".save(doc) (async mode)", () => {
    it("should save the document and execute callback", done => {
      const pet = { name: "Gilbert" };
      memdb.save(pet, () => {
        const ret = memdb.first({ name: "Gilbert" });
        assert(ret === pet);
        done(); // signal mocha you're done with the test
      });
    });
  });
});