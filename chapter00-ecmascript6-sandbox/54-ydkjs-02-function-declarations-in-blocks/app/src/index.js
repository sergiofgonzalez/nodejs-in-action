/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
'use strict';

const alwaysFalse = false;
if (alwaysFalse) {
  function ask() {
    console.log('Does this run?');
  }
}
ask();

/* a somewhat valid use case for functions in blocks */
if (typeof Array.isArray != 'undefined') {
  function isArray(a) {
    return Array.isArray(a);
  }
} else {
  function isArray(a) {
    return Object.prototype.toString.call(a) == '[object Array]'; 
  }
}
