"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;


/* Object.assign */
const defaults = {
  useMillis: 0,
  persistInDb: false,
};

function handlePerfCounters(perfCounters, options) {
  const config = Object.assign({}, defaults, options);
  console.log(`processing perfCounters with options=${ util.inspect(config) }`);
}

handlePerfCounters({bootstrap: 100, processing: 200}, {tables: ["event_log", "perf_tests"]});

// Note that the user-provided value will prevail over the one passed defaults
const options = {
  first: "one",
  second: "two"
};

const mergedOptions = Object.assign({}, options, {first: 1});
console.log(`mergedOptions=${ util.inspect(mergedOptions) }`);

// There are some caveats though associated with deep-nested properties
const config = {
  persistence: {
    enabled: false,
    tables: []
  },
  units: {
    useMillis: true,
    useIsoDates: true
  }
};

const mergedConfig = Object.assign({}, config, {persistence: { tables: ["perf_log_table"]}});
console.log(`mergedConfig = ${ util.inspect(mergedConfig) }`); // wow: persistence: enabled is LOST!



/* Object.is */

// Object.is lets you perform object to object comparisons
// Most of the times is the same as ===

console.log(NaN === NaN); // eslint-disable-line use-isnan
console.log(Object.is(NaN, NaN));

console.log(-0 === +0); // eslint-disable-line use-isnan
console.log(Object.is(-0, +0));