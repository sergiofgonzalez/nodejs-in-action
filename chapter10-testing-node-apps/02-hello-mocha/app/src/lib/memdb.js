"use strict";

const db = [];

exports.save = doc => {
  db.push(doc);
};

exports.first  = obj => {
  return db.filter(doc => {
    for (const key in obj) {
      if (doc[key] !== obj[key]) {
        return false;
      }
    }
    return true;
  }).shift();
};

exports.clear = () => {
  db.length = 0;
};

exports.saveSync = doc => {
  db.push(doc);
};

exports.save = (doc, cb) => {
  db.push(doc);
  if (cb) {
    setTimeout(() => {
      cb();
    }, 1000);
  }
};