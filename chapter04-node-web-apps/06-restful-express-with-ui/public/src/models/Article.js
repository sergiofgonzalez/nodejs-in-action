"use strict";

const sqlite3 = require("sqlite3").verbose();
const dbname = "later.sqlite";

const db = new sqlite3.Database(dbname);

db.serialize(function () {
  const sql = `
    CREATE TABLE IF NOT EXISTS articles (
       id INTEGER PRIMARY KEY,
       title TEXT,
       content TEXT
    )`;
  db.run(sql);
});

class Article {
  
  static all(cb) {
    db.all(`SELECT * FROM articles`, cb);
  }

  static find(id, cb) {
    db.get(`SELECT * FROM articles WHERE id = ?`, id, cb);
  }

  static create(article, cb) {
    db.run(`INSERT INTO articles (title, content) VALUES (?, ?)`, article.title, article.content, err => {
      if (err) {
        cb(err);
      }
      article.id = this.lastID;
      cb(err, article);
    });
  }

  static delete(id, cb) {
    db.run(`DELETE FROM articles WHERE id = ?`, id, cb);
  }
}

exports.db = db;
exports.Article = Article;