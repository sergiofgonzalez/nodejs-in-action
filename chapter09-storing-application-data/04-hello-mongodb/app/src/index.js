"use strict";

const { MongoClient } = require("mongodb");
const util = require("util");
util.inspect.defaultOptions.depth = null;


doMongoDbOperations();

async function doMongoDbOperations() {
  const db = await connect();
  
  const result = await insertArticle(db);
  console.log(` = ${ result }; result.insertedId = ${ result.insertedId };`);

  const results = await queryArticles(db);
  console.log(`results = ${ util.inspect(results) }`);

  await closeConnection(db);
}

async function connect() {
  return MongoClient.connect("mongodb://localhost:27017");
}

async function insertArticle(db) {
  const article = { title: "Introducing MongoDB", content: "Trying to make sense" };
  return db
          .collection("articles")
          .insertOne(article);
}

async function queryArticles(db) {
  return db
          .collection("articles")
          .find({ title: "Introducing MongoDB" })
          .toArray();
}

async function closeConnection(db) {
  return db.close();
}