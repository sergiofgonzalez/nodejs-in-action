"use strict";

console.time("test duration");

const assert = require("assert");
const Todo = require("../src/models/todo");
let testsCompleted = 0;

function testDeleteAll() {
  /* Arrange */
  const todo = new Todo();
  todo.add("Item #1");

  /* Act */
  todo.deleteAll();

  /* Assert */
  assert.equal(todo.length, 0, "No item should exist");
  testsCompleted++;
}

function testAdd() {
  /* Arrange */
  const todo = new Todo();

  /* Act */
  todo.add("Item #1");

  /* Assert */
  assert.notEqual(todo.length, 0, "One item should exist");
  testsCompleted++;
}

function testDoAsync(cb) {
  /* Arrange */
  const todo = new Todo();

  /* Act */
  todo.doAsync((value) => {
    /* Assert */
    assert.ok(value, "Callback should be passed true");
    testsCompleted++;
    cb();
  });
}


function testThrows() {
  /* Arrange */
  const todo = new Todo();

  assert.throws(todo.add, /requires/);
  testsCompleted++;
}

testDeleteAll();
testAdd();
testDoAsync(() => console.log("Hello, async test"));
testThrows();

console.timeEnd("test duration");

console.log(`${ testsCompleted } test${ testsCompleted !== 1? "s have": " has" } been completed`);