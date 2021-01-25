"use strict";

const shared = require("./shared-module");
const module1 = require("./module1");
const module2 = require("./module2");

shared.displayInternalState();
module1.show();
module2.show();
