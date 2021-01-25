"use strict";

class Todo {
  constructor() {
    this.todos = [];
  }

  add(item) {
    if (!item) throw new Error("Todo.add requires an item");
    this.todos.push(item);
  }

  deleteAll() {
    this.todos =  [];
  }

  get length() {
    return this.todos.length;
  }

  doAsync(cb) {
    setTimeout(cb, 2000, true); // run the given logic after 2 secs passing true
  }
}

module.exports = Todo;