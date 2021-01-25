'use strict';

module.exports = (req, res, next) => {
  res.locals.messages = req.session.messages || [];
  for (const message of res.locals.messages) {
    switch (message.type) {
      case 'success':
        message.type = 'alert alert-success';
        break;

      case 'info':
        message.type = 'alert alert-info';
        break;

      case 'error':
        message.type = 'alert alert-danger';
        break;
    }
  }
  res.locals.removeMessages = () => {
    req.session.messages = [];
  };

  next();
};