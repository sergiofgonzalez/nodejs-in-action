"use strict";

const chai = require("chai");


/* assert interface */
(() => {
  const assert = chai.assert;
  const foo = "bar";
  const tea = { flavors: ["chai", "earl grey", "darjeeling"] };

  assert.typeOf(foo, "string");

  assert.equal(foo, "bar");
  assert.lengthOf(foo, 3);

  assert.property(tea, "flavors");
  assert.lengthOf(tea.flavors, 3);
})();


/* expect interface */
(() => {
  const expect = chai.expect;
  const foo = "bar";

  expect(foo).to.be.a("string");
  expect(foo).to.equal("bar");
})();

/* should interface */
(() => {
  chai.should();

  const foo = "bar";

  foo.should.be.a("string");
  foo.should.equal("bar");
})();

