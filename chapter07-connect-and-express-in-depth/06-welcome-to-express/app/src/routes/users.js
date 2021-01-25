"use strict";

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({username: "sergio.f.gonzalez", id: 1});
});

module.exports = router;