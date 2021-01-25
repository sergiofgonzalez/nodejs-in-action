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

    await createTable();
    console.log(`Created table "snippets"`);

    const savedSnippetId = await insertData();
    console.log(`Successfully inserted row: id = ${ savedSnippetId }`);

    const numRowsUpdated = await updateData(savedSnippetId);
    console.log(`Successfully updated ${ numRowsUpdated } row${ numRowsUpdated === 1? "": "s" }`);

    const rows = await queryData();
    for (const row of rows) {
      console.log(util.inspect(row));
    }

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

async function createTable() {
  return new Promise((resolve, reject) => {
    db.query(`
      CREATE TABLE IF NOT EXISTS snippets (
        id SERIAL,
        body TEXT,
        PRIMARY KEY (id)
      )`, err => {
      if (err) {
        return reject(err);
      } 
      resolve();
    });
  });
}

async function insertData() {
  return new Promise((resolve, reject) => {
    const body = "Hello to Jason Isaacs!";
    db.query(`
      INSERT INTO snippets 
        (body)
        VALUES ( '${ body }' )
      RETURNING id
    `, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.rows[0].id);
    });
  });
}

async function updateData(snippetId) {
  const body = "Hello to Idris Elba";
  return new Promise((resolve, reject) => {
    db.query(`
      UPDATE snippets
         SET body = '${ body }'
       WHERE id = ${ snippetId };
    `, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.rowCount);
    });
  });
}

async function queryData() {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM snippets
       ORDER BY id
    `, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.rows);
    });
  });
}