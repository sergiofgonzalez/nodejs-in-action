"use strict";

const redis = require("redis");
const config = require("../lib/config");
const debug = require("debug")("entry:server");


const db = redis.createClient({ host: config("db:host"), port: config("db:port") });


db.on("error", err => {
  debug(`Error connecting to the REDIS database: ${ err }`);
  throw new Error(err);
});

class Entry {
  constructor(obj) {
    for (const key in obj) {
      this[key] = obj[key];
    }
  }

  static getRange(from, to, cb) {
    db.lrange("entries", from, to, (err, items) => {
      if (err) {
        return cb(err);
      }
      const entries = [];
      items.forEach(item => {
        entries.push(JSON.parse(item));
      });
      cb(null, entries);
    });
  }

  save(cb) {
    const entryJSON = JSON.stringify(this);
    db.lpush("entries", entryJSON, err => {
      if (err) {
        return cb(err);
      }
      cb();
    });
  }

  static count(cb) {
    db.llen("entries", cb);
  }
}

module.exports = Entry;
