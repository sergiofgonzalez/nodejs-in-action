"use strict";

const shared = require("./shared-module");

shared.setInternalState(5);

exports.show = function () {
  shared.displayInternalState();
};
