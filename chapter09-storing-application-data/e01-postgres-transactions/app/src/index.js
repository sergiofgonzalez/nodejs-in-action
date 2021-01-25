"use strict";


const pg = require("pg");
const util = require("util");
util.inspect.defaultOptions.depth = null;


const db = new pg.Client({ database: "articles", user: "postgres", password: "postgres" });


doSomeDbProcessing();


async function doSomeDbProcessing() {
  try {
    await connectToDb();
    console.log(`Successfully connected to the Database!`);

    await dropTables();
    console.log(`Removing tables (if exist)`);

    await createTables();
    console.log(`Created tables`);

    await insertDataNonTransactional();
    console.log(`Successfully inserted data in tables`);

    await insertDataInTransaction();
    console.log(`Successfully rolledback transaction!`);

    db.end();
    console.log(`Connection closed!`);
  } catch (e) {
    console.log(`An error occurred while doing DB processing: ${ e.message }`);
  } 
}

async function connectToDb() {
  return new Promise((resolve, reject) => {
    db.connect(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

async function dropTables() {
  const p1 = new Promise((resolve, reject) => {
    db.query(`
      DROP TABLE IF EXISTS emails`, err => {
      if (err) {
        return reject(err);
      } 
      resolve();
    });
  });

  const p2 = new Promise((resolve, reject) => {
    db.query(`
      DROP TABLE IF EXISTS users`, err => {
      if (err) {
        return reject(err);
      } 
      resolve();
    });
  });

  p1.then(() => p2);
}

async function createTables() {
  const p1 = new Promise((resolve, reject) => {
    db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL,
        username TEXT,
        PRIMARY KEY (id)
      )`, err => {
      if (err) {
        return reject(err);
      } 
      resolve();
    });
  });
  
  const p2 = new Promise((resolve, reject) => {
    db.query(`
      CREATE TABLE IF NOT EXISTS emails (
        id SERIAL,        
        userid INTEGER REFERENCES users (id),
        email TEXT,
        PRIMARY KEY (id)
      )`, err => {
      if (err) {
        return reject(err);
      } 
      resolve();
    });
  });

  return p1.then(() => p2);
}

async function insertDataNonTransactional() {
  const pInsert1 = new Promise((resolve, reject) => {
    db.query(`
      INSERT INTO users (username) VALUES ( $1 ) RETURNING id`, ["sergio"], 
    (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.rows[0].id);
    });
  });

  const userid = await pInsert1;

  const pInsert2 = new Promise((resolve, reject) => {
    db.query(`
      INSERT INTO users (username) VALUES ( $1 ) RETURNING id`, ["jason.isaacs"], 
    (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.rows[0].id);
    });
  });

  const pInsert3 = new Promise((resolve, reject) => {
    db.query(`
      INSERT INTO emails (userid, email) VALUES ($1, $2 ) RETURNING id`, [userid, "sergio@github.com"], 
    (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.rows[0].id);
    });
  });

  const pInsert4 = new Promise((resolve, reject) => {
    db.query(`
      INSERT INTO emails (userid, email) VALUES ($1, $2 ) RETURNING id`, [userid, "sergio@gmail.com"], 
    (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.rows[0].id);
    });
  });

  return Promise.all([pInsert2, pInsert3, pInsert4]);
}


async function insertDataInTransaction() {

  return new Promise((resolve, reject) => {
    db.query("BEGIN", err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  })
  .then(() => new Promise((resolve, reject) => {
    db.query(`INSERT INTO users (username) VALUES ($1) RETURNING id`, ["idris"], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.rows[0].id);
    });
  }))
  .then(userid => new Promise((resolve, reject) => {
    db.query(`INSERT INTO emails (userid, email) VALUES ($1, $2 ) RETURNING id`, [userid, "idriso@aol.com"], err => {
      if (err) {
        return reject(err);
      }
      resolve(userid);
    });
  }))
  .then(userid => new Promise((resolve, reject) => {
    db.query(`INSERT INTO emails (userid, email) VALUES ($1, $2 ) RETURNING id`, [userid, "idriso@bbc.com"], err => {
      if (err) {
        return reject(err);
      }
      resolve(userid);
    });
  }))
  .then(() => new Promise((resolve, reject) => {
    db.query("ROLLBACK", err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  }));
}
