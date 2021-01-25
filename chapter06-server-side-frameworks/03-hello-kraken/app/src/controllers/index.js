"use strict";

const IndexModel = require("../models/index");

module.exports = router => {
  const model = new IndexModel();

  router.get("/", (req, res) => {
    res.render("index", model);
  });
};