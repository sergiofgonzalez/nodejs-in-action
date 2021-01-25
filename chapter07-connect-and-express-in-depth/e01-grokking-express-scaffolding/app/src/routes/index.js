"use strict";

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { currentFramework: "Express", oldFramework: "Koa2" });
});

module.exports = router;