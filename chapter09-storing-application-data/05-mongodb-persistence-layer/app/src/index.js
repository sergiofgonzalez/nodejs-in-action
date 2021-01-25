"use strict";

const db = require("./lib/db");
const util = require("util");
util.inspect.defaultOptions.depth = null;

doSomeDbOperations();

async function doSomeDbOperations() {
  await db.initialize("mongodb://localhost:27017/articles");
  const article = { title: "Article Title #1", body: "The contents of article #1" };
  const result = await db.Article.create(article);
  console.log(`result.insertedId: ${ result.insertedId }; created at ${ result.insertedId.getTimestamp() }`); 

  const articles = await db.Article.all();
  console.log("===================");
  articles.forEach(article => console.log(`article = ${ util.inspect(article) }; created at ${ article._id.getTimestamp() }`));


  const savedArticle = await db.Article.findById(result.insertedId);
  console.log(`article      = ${ util.inspect(article) } created at ${ article._id.getTimestamp() }`);
  console.log(`savedArticle = ${ util.inspect(savedArticle) } created at ${ savedArticle._id.getTimestamp() }`);

  if (article !== savedArticle) {
    console.log(`Persisted articles cannot be compared using "==="`);
  }

  if (article._id.equals(savedArticle._id)) {
    console.log(`Article and savedArticle are equal!!!`);
  }

  // Removing all entries
  articles.forEach(article => db.Article.deleteById(article._id));

  db.shutdown();
}

