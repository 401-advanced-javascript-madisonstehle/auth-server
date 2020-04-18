'use strict';

const throwError = (err, req, res, next) => {
  console.log(err);
  switch(req.route.path) {
  case '/signup':
    console.log(`Uh oh! Something went wrong with your request! ERROR ${err.code}: ${err.status}`);
    res.send(`Uh oh! Something went wrong with your request! ERROR ${err.code}: ${err.status}`);
    break;
  case '/signin':
    console.log(`Uh oh! That username or password is incorrect! ERROR ${err.code}: ${err.status}`);
    res.send(`Uh oh! That username or password is incorrect! ERROR ${err.code}: ${err.status}`);
    break;
  default:
    res.end();
    return;
  }
};

module.exports = throwError;