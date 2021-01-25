"use strict";

const express = require("express");
const multer = require("multer");
const formDataParser = multer();

const debug = require("debug")(`form:server`);
const util = require("util");

const router = express.Router();
util.inspect.defaultOptions.depth = null;

/*
  Note that paths found here are relative
  to the path found in the `app.use`
*/

router.post("/", formDataParser.none(), (req, res) => {
  debug(`req.body = ${ util.inspect(req.body) }`);
  res.send({ message: `Hello to ${ req.body.email }` });
});



module.exports = router;