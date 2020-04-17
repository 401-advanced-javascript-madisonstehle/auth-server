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