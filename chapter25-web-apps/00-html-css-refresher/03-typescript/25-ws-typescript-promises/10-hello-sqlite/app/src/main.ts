import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

open({ driver: sqlite3.Database , filename: ':memory:' })
  .then((db) => {
    return db.run('CREATE TABLE promise (id INT, description CHAR);')
      .then(() => db.run(`INSERT INTO promise VALUES (1, 'I will always luv u, TypeScript')`))
      .then(() => db.all('SELECT * FROM promise'))
      .then((rows) => console.log(`INFO: rows:`, rows))
      .catch((err) => console.error(`ERROR: an error was found while interacting with the db: ${ (err as Error).message }`))
      .finally(() => db.close());
  });
