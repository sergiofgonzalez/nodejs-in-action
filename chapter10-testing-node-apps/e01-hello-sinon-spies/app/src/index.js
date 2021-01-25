'use strict';

const maxwell = {
  immediate(cb) {
    cb('foo', 'bar');
  },
  debounce(cb) {
    setTimeout(cb, 0);
  }
};

module.exports = maxwell;