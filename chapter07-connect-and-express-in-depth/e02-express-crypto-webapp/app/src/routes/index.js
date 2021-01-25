"use strict";

const cryptoHelper = require("../lib/crypto-helper");

exports.form = (req, res) => {
  let result = req.session.result || "";
  let action = req.session.action || "No action performed";
  req.session.result = undefined;
  req.session.action = undefined;
  res.render("post", { title: "Encrypt/Decrypt Helper", result, action });
};

exports.submit = async (req, res) => {
  const data = req.body.entry;
  
  try {
    if ("encrypt" in req.body) {
      const result = await cryptoHelper.encrypt(data.value);
      req.session.result = result;
      req.session.action = `Result of encrypting "${ data.value }"`;
      req.session.messages.push({ type: "success", string: "Successfully encrypted value" });    
    } else {
      const result = await cryptoHelper.decrypt(data.value);
      req.session.result = result;    
      req.session.action = `Result of decrypting "${ data.value }"`;      
      req.session.messages.push({ type: "success", string: "Successfully decrypted value" });    
    }
  } catch (e) {
    req.session.messages.push({ type: "error", string: `Could not apply operation: ${ e }`});
  }

  res.redirect("back");
};


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