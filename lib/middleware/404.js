'use strict';

const give404 = (req, res) => {
  res.status(404);
  res.send('<h1>Hi there! We didn\'t find what you were looking for! That route does not exist here (ERROR 404).</h1>');
};

module.exports = give404;