"use strict";

exports.notFound = (req, res) => {
  res.status(404)
    .format({
      html: () => {
        res.render("404");
      },
      json: () => {
        res.send({ message: "Resource not found" });
      },
      xml: () => {
        res.write("<error>\n");
        res.write("  <message>Resource not found</message>\n");
        res.end("</error>\n");
      },
      text: () => {
        res.send("Resource not found\n");
      }
    });
};

exports.error = (err, req, res, next) => {
  let msg;
  console.error(err.stack);

  switch (err.type) {
    case "database":
      msg = "Server Unavailable";
      res.statusCode = 503;
      break;
    case "authorization":
      msg = "Unauthorized";
      res.statusCode = 401;
      break;
    default:
      msg = "Internal Server Error";
      res.statusCode = 500;
  }

  res.format({
    html: () => {
      res.render("5xx", { msg: msg, status: res.statusCode });
    },
    json: () => {
      res.send({ error: msg });
    },
    text: () => {
      res.send(`${ msg }\n`);
    },
    default: () => {
      res.status(406).send("Not Acceptable");
    }
  });
  next(new Error(msg));
};