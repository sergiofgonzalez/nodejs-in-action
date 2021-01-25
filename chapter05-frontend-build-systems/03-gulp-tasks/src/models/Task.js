"use strict";

const sqlite3 = require("sqlite3").verbose();
const dbname = `todo.sqlite`;

const db = new sqlite3.Database(dbname);

db.serialize(function () {
  const sql = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY,
      task TEXT,
      done BOOLEAN
    )`;
  db.run(sql);
});

class Task {

  static all(cb) {
    db.all(`SELECT * FROM tasks`, cb);
  }

  static create(task, cb) {
    db.get(`SELECT * FROM tasks WHERE task = ?`, task.description, (err, savedTask) => {
      if (!savedTask) {
        db.run(`INSERT INTO tasks (task, done) VALUES (?, ?)`, task.description, task.done, err => {
          if (err) {
            cb(err);
          }
          task.id = this.lastID;
          task.done = false;
          cb(err, task);
        });
      } else {
        db.run(`UPDATE tasks SET done = ? WHERE id = ?`, task.done, savedTask.id, cb);
      }
    });
  }
}

exports.db = db;
exports.Task = Task;