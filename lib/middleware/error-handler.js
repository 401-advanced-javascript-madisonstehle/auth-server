'use strict';

const throwError = (err, req, res, next) => {
  switch(req.route.path) {
    case '/signup':
      res.send('message', err);
      break;
    case '/signin':
      break;
    case '/users':
      break;
  }
    res.status(401);
    res.send('<h1>Hi there! We didn\'t find what you were looking for! (ERROR 401).</h1>');
}

module.exports = throwError;