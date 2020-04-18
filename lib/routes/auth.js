'use strict';
// ========== Esoteric Resources ==========
const express = require('express');

// ========== Internal Resources ==========
const auth = require('../middleware/auth-auth.js');

// ========== Setup ==========
const router = express.Router();

// ========== Routes =========
/**
 * This route creates a new user
 * @route POST /signup
 * @group authorization
 * @param {string} authorization.headers.required - The basic authorization for the username and password
 * @property {string} username.required - the user's unique username
 * @property {string} password.required - the user's password
 * @property {string} firstName - the user's first name
 * @property {string} lastName - the user's last name
 * @returns {object} 201 - The new user object
 */
router.post('/signup', async (req, res, next) => {
  try{
    let user = await auth(req, res, next);
    res.status(201);
    res.send(user);
  } 
  catch(e) {
    console.error(e);
  }
});

/**
 * This route finds an existing user
 * @route POST /signin
 * @group authorization
 * @returns {object} 200 - The found user object
 */
router.post('/signin', async (req, res, next) => {
  try {
    await auth(req, res, next);

    if (req.user) {
      res.status(200);
      res.send(req.user);
    }
  }
  catch(e) {
    console.error(e);
  }
});

module.exports = router;