"use strict";

const express = require("express");
const router = express.Router();

/*
  Note that paths found here are relative
  to the path found in the `app.use`
*/

router.get("/", () => {
  throw new Error("Throwing a fabricated error");
});


module.exports = router;