'use strict';


exports.home = (req, res) => {
  res.render('home', { title: `OAuth2 Protected Resource` });
};

exports.resource = (req, res) => {
  const resource = {
    name: 'Protected Resource',
    description: 'This data has been protected by OAuth 2.0'
  };

  if (req['access_token']) {
    res.json(resource);
  } else {
    res.status(401).end();
  }
};
