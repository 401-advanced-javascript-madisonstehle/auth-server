'use strict';

const throwError = (err, req, res, next) => {
  console.log(err);
  switch(req.route.path) {
    case '/signup':
      res.send(`Uh oh! Something went wrong with your request! ERROR ${err.code}: ${err.status}`);
      break;
    case '/signin':
      res.send(`Uh oh! That username or password is incorrect! ERROR ${err.code}: ${err.status}`);
      break;
    case '/users':
      res.send(`It seems there are not currently any users. ERROR ${err.code}: ${err.status}`);
      break;
  }
}

module.exports = throwError;