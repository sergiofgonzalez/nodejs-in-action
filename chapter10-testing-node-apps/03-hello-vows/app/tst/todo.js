"use strict";

const vows = require("vows");
const assert = require("assert");
const Todo = require("../src/lib/todo");

vows.describe("Todo").addBatch({
  "when adding an item": {
    topic: () => {
      const todo = new Todo();
      todo.add("Wash my car");
      return todo;
    },
    "it should exist in my todos": (err, todo) => {
      assert.equal(todo.length, 1);
    }
  }
}).export(module);