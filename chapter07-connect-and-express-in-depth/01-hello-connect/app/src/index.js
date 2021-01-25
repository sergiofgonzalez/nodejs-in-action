"use strict";

const app = require("connect")();

app.use((req, res) => {
  res.end("Hello to Jason Isaacs!");
});

app.listen(5000);