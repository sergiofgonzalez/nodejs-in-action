"use strict";

const express = require("express");


const app = express();

app.get("/", (req, res) => {
  app.emit("rootHit", { ts: new Date(), message: "root has been hit" });
  res.send("Hello, world!");
});


app.listen(process.env.PORT || 5000);

app.on("rootHit", evt => console.log("The root '/' has been accessed:", evt));