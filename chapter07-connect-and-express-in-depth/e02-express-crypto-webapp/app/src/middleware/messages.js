"use strict";

// function message(req) {
//   return (msg, type) => {
//     type = type || "info";
//     const session = req.session;
//     session.messages = session.messages || [];
//     session.messages.push({ type: type, string: msg });
//   };
// }

module.exports = (req, res, next) => {
  // res.message = message(req);
  // res.error = msg => {
  //   return res.message(msg, "alert alert-danger");
  // };
  res.locals.messages = req.session.messages || [];
  res.locals.messages.forEach(message => {
    switch (message.type) {
      case "success":
        message.type = "alert alert-success";
        break;
      
      case "info":
        message.type = "alert alert-info";
        break;
      
      case "error":
        message.type = "alert alert-danger";
        break;
    }
  });
  res.locals.removeMessages = () => {
    req.session.messages = [];
  };
  next();
};