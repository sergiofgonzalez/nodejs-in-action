import { Database } from 'sqlite3';

const db: Database = new Database(':memory:', err => {
  if (err) {
    console.error(`ERROR: could not create database: ${ (err as Error).message }`);
    return db.close();
  }

  db.run('CREATE TABLE promise (id INT, description CHAR);', err => {
    if (err) {
      console.error(`ERROR: could not create table: ${ (err as Error).message }`);
      return db.close();
    }

    db.run(`INSERT INTO promise VALUES (1, 'I will always luv u, TypeScript')`, err => {
      if (err) {
        console.error(`ERROR: could not insert values in table: ${ (err as Error).message }`);
        return db.close();
      }

      db.all('SELECT * FROM promise', (err, rows) => {
        if (err) {
          console.error(`ERROR: could retrieve data from table: ${ (err as Error).message }`);
          return db.close();
        }
        console.log(`INFO: rows:`, rows);

        db.close(err => {
          if (err) {
            console.error(`ERROR: could not close database: ${ (err as Error).message }`);
            return;
          }
          console.log(`INFO: connection succesfully closed!`);
        });
      });
    });
  });
});