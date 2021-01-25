import sqlite3 from 'sqlite3';

export function createDb(dbfile) {
  return new sqlite3.Database(dbfile);
}