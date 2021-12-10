import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';

export interface ToDoTaskModel {
  id: number;
  desc: string;
}

export class ToDoTaskDb {
  private db: Database;
  private initialized = false;

  constructor() {
    this.db = new Database({
      driver: sqlite3.Database,
      filename: ':memory:'
    });
  }

  initialize() {
    if (this.initialized) {
      return Promise.resolve(true);
    }
    return this.db
      .open()
      .then(() => this.db.run(`CREATE TABLE todos (id INTEGER PRIMARY KEY, desc CHAR)`))
      .then(() => this.initialized = true);
  }

  create(payload: ToDoTaskModel) {
    return this.db.run(`INSERT INTO todos (desc) VALUES (?)`, payload.desc);
  }

  delete(id: number) {
    return this.db.run(`DELETE FROM todos WHERE id = ?`, id);
  }

  getAll() {
    return this.db.all<ToDoTaskModel>(`SELECT id, desc FROM todos`);
  }

  getOne(id: number) {
    return this.db.get<ToDoTaskModel>(`SELECT id, desc FROM todos WHERE id = ?`, id);
  }

  update(payload: ToDoTaskModel) {
    return this.db.run(`UPDATE todos SET desc = ? WHERE id = ?`, payload.desc, payload.id);
  }
}
