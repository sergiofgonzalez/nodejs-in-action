"use strict";

const config = require("./lib/config");
const log4js = require("log4js");
const logger = log4js.getLogger("index.js");
logger.setLevel(config("logger:level"));

const articles = require("./mock-data/articles.json");


const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // support bodies encoded as JSON
app.use(bodyParser.urlencoded({extended: true})); // support form encoded bodies


app.get("/articles", (req, res) => {
  logger.debug("Request received to return all articles");
  res.send(articles);
});

app.post("/articles", (req, res) => {
  logger.debug(`Request received to save new article with title ${req.body.title}`);

  const newId = articles.length;
  const article = { id: newId, title: req.body.title };
  articles[articles.length] = article;
  articles.length++;

  logger.debug(`Article successfully created new article with id=${newId}`);
  res.send(articles[newId]);
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