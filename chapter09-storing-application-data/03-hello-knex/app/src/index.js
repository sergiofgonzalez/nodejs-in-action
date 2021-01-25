"use strict";

const knex = require("knex");
const util = require("util");
util.inspect.defaultOptions.depth = null;

const mysqlQuery = knex({ client: "mysql"})
                    .select()
                    .from("users")
                    .where({ id: 123 })
                    .toSQL();

console.log(`MySQL: ${ mysqlQuery.sql }`);


// Running queries with Knex (Promise & Callback Flavors)
runPostgresQueryPromises();
runPostgresQueryCallbacks();

async function runPostgresQueryPromises() {
  const postgresDB = knex({ 
    client: "pg", 
    connection: { database: "articles", user: "postgres", password: "postgres" },
    pool: { idleTimeoutMillis: 1000, disposeTimeout: 1000 }
  });

  const results = await postgresDB("snippets")
                          .select("body")
                          .where({ id: 5 });
  
  results.forEach(result => console.log(result.body));
  await postgresDB.destroy();                          
  console.log(`Knex session successfully finished!`);
}

function runPostgresQueryCallbacks() {
  const postgresDB = knex({ 
    client: "pg", 
    connection: { database: "articles", user: "postgres", password: "postgres" },
    pool: { idleTimeoutMillis: 1000, disposeTimeout: 1000 }
  });

  postgresDB("snippets")
    .select("body")
    .whereIn("id", [1, 3, 5])
    .asCallback((err, results) => {
      results.forEach(result => console.log(result.body));
      postgresDB.destroy(err => {
        if (err) {
          console.log(`Could not destroy Knex session: ${ err }`);
          throw err;
        }
        console.log(`Knex session successfully finished!`);      
      });
    });
} 

// Using SQLite 3 backend
runSqlite3Queries();
async function runSqlite3Queries() {
  const sqlite3DB = knex({ client: "sqlite3", connection: { filename: "sqlite-db-file.sqlite" }, useNullAsDefault: true });

  await sqlite3DB.schema.createTableIfNotExists("snippets", table => {
    table.increments("id").primary();
    table.string("body");
  });

  await sqlite3DB("snippets").insert({ body: "Hello to Riz Ahmed" });
  const results = await sqlite3DB("snippets").orderBy("body");
  results.forEach(result => console.log(result.body));

  await sqlite3DB.destroy();
}