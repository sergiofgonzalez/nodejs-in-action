"use strict";

var internalState = 1;

exports.setInternalState = function (value) {
  internalState = value;
};

exports.displayInternalState = function () {
  console.log("current internal state:", internalState);
};
