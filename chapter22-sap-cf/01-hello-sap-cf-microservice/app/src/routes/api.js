'use strict';

exports.heartbeat = (req, res) => {
  res.send({ message: `It's alive!`, instant: new Date().toISOString() });
};