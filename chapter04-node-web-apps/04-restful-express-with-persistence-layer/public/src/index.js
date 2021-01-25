"use strict";

const config = require("./lib/config");
const log4js = require("log4js");
const logger = log4js.getLogger("index.js");
logger.setLevel(config("logger:level"));

const Article = require("./models/Article").Article;

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // support bodies encoded as JSON
app.use(bodyParser.urlencoded({extended: true})); // support form encoded bodies
app.set(`port`, config(`server:port`));


app.get("/articles", (req, res, next) => {
  logger.debug("Request received to return all articles");
  Article.all((err, articles) => {
    if (err) {
      logger.error(`Error retrieving articles from the database: ${err}`);
      return next(err);
    }
    res.send(articles);
  });
});

app.post("/articles", (req, res, next) => {
  logger.debug(`Request received to save new article with title ${req.body.title}`);

  Article.create({title: req.body.title, content: req.body.content}, (err, article) => {
    if (err) {
      logger.error(`Error saving article to the database: ${err}`);
      next(err);
    }
    res.send(article);
  });
});

app.get("/articles/:id", (req, res, next) => {
  const articleId = req.params.id;
  logger.debug(`Request received to return article ${articleId}`);
  Article.find(articleId, (err, article) => {
    if (err) {
      logger.error(`Error retrieving article from the database: ${err}`);
      next(err);
    }
    res.send(article);
  });
});

app.delete("/articles/:id", (req, res, next) => {
  const articleId = req.params.id;
  logger.debug(`Request received to remove article ${articleId}`);
  Article.delete(articleId, err => {
    if (err) {
      logger.error(`Error removing article from the database: ${err}`);
      next(err);
    }
    res.send({message: `Deleted ${articleId}`});
  });
});



app.listen(app.get(`port`), err => {
  if (err) {
    logger.error(`Could not establish HTTP server on port ${app.get("port")}`);
    throw err;
  }
  logger.info(`HTTP server started on port ${app.get("port")}`);
});

module.exports = app;