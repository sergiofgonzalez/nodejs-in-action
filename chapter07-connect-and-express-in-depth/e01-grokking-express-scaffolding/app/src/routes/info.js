"use strict";

const express = require("express");
const router = express.Router();

/*
  Note that paths found here are relative
  to the path found in the `app.use`
*/

router.get("/", (req, res) => {
  res.send({ name: "Jason", surname: "Isaacs" });
});

router.post("/", (req, res) => {
  res.send({ message: `Hello to ${ req.body.name }` });
});


module.exports = router;