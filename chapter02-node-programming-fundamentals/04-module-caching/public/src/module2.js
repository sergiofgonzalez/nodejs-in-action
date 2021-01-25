"use strict";

const shared = require("./shared-module");

shared.setInternalState(55);

exports.show = function () {
  shared.displayInternalState();
};
