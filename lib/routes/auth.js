'use strict';
// ========== Esoteric Resources ==========
const express = require('express');

// ========== Internal Resources ==========
const auth = require('../middleware/auth-auth.js');
const throwError = require('../middleware/error-handler.js');

// ========== Setup ==========
const router = express.Router();

// ========== Routes =========
/**
 * This route creates a new user
 * @route POST /signup
 * @group authorization
 * @param {string} authorization.headers.required - The basic authorization for the username and password
 * @param {string} username.body.required - the user's unique username
 * @param {string} password.body.required - the user's password
 * @returns {object} 201 - The new user object
 */
router.post('/signup', async (req, res, next) => {
  let user = await auth(req, res, next);
  if (user) {
    let token = user.generateToken();
    res.status(201);
    res.send({user, token});
  } else {
    next({code: 400, status: 'Bad Request'});
  }
});

/**
 * This route finds an existing user
 * @route POST /signin
 * @group authorization
 * @returns {object} 200 - The found user object
 */
router.post('/signin', async (req, res, next) => {
  await auth(req, res, next);

  if (req.user) {
    res.status(200);
    let token = req.user.generateToken();
    res.send({user: req.user, token: token});
  } else {
    next({code: 401, status: 'Unauthorized'});
  }

});

/**
 * This route finds an existing user
 * @route POST /user
 * @group authorization
 * @returns {String} 200 - a message that only logged in users can see
 */
router.get('/user', async (req, res, next) => {
  await auth(req, res, next);

  if (req.user._id) {
    res.status(200);
    res.send( { user: req.user } );
  } else {
    next({code: 401, status: 'Unauthorized'});
  }
});

router.use(throwError);

module.exports = router;
