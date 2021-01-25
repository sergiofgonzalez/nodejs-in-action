'use strict';

function range(start, end) {
  function getRange(end) {
    const result = [];
    for (let i = start; i <= end; i++)
      result.push(i);
    return result;    
  }

  if (end !== null & end !== undefined) {
    return getRange(end);
  } else {
    return getRange;
  }
}

module.exports = range;