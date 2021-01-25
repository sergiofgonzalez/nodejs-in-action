'use strict';

/* 
  POLE: Principle of Least Exposure 
  As curMonth is only needed for a couple of statements, define a block scope for it
*/
function getNextMonthStart(dateStr) {
  var nextMonth, year;
  {
    let curMonth;
    [ , year, curMonth ] = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/) || [];
    nextMonth = (Number(curMonth) % 12) + 1;
  }
  if (nextMonth == 1) {
    year++;
  }

  return `${ year }-${ String(nextMonth).padStart(2, '0') }-01`;
}

console.log(getNextMonthStart('2019-12-25'));


/* Another example */

function sortNamesByLength(names) {
  var buckets = [];

  for (let firstName of names) {
    if (buckets[firstName.length] == null) {
      buckets[firstName.length] = [];
    }
    buckets[firstName.length].push(firstName);
  }

  {
    let sortedNames = [];
    for (let bucket of buckets) {
      if (bucket) {
        bucket.sort();
        sortedNames = [...sortedNames, ...bucket];
      }
    }
    return sortedNames;
  }
}

console.log(sortNamesByLength([
  'Sally',
  'Suzy',
  'Frank',
  'John',
  'Jennifer',
  'Scott'
]));

