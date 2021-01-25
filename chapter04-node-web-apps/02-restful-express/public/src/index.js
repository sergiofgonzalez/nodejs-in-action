"use strict";

const config = require("./lib/config");
const log4js = require("log4js");
const logger = log4js.getLogger("index.js");
logger.setLevel(config("logger:level"));

const articles = require("./mock-data/articles.json");


const express = require("express");

const app = express();



app.get("/articles", (req, res) => {
  logger.debug("Request received to return all articles");
  res.send(articles);
});

app.post("/articles", (req, res) => {
  logger.debug("Request received to save an article");
  res.send("OK");
});

app.get("/articles/:id", (req, res) => {
  const articleId = req.params.id;
  logger.debug(`Request received to return article ${articleId}`);
  res.send(articles[articleId]);
});

app.delete("/articles/:id", (req, res) => {
  const articleId = req.params.id;
  logger.debug(`Request received to remove article ${articleId}`);
  delete articles[articleId];
  res.send(`Successfully removed article ${articleId}`);
});


logger.info(`HTTP server started on port ${config("server:port")}`);
app.listen(config("server:port"));

module.exports = app;