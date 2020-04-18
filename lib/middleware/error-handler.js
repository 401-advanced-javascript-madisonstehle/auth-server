'use strict';

const throwError = (req, res) => {
  if (req.route.path === '/signup'){
    res.status(401)
    res.send('<h1>Hi there! We didn\'t find what you were looking for! (ERROR 401).</h1>');
  }
}

module.exports = throwError;