'use strict';

// ========== Esoteric Resources ==========
const express = require('express');

// ========== Internal Resources ==========
const auth = require('../middleware/auth-auth.js');
const roles = require('../../docs/roles.json');
const throwError = require('../middleware/error-handler.js');

// ========== Setup ==========
const router = express.Router();

/**
 * This route displays a public message
 * @route GET /public
 * @group RBAC
 * @returns {string} 200 - A public message
 */
router.get('/public', (req, res, next) => {
  res.send('this is a public page, every noob can see this message');
});

/**
 * This route displays a private message
 * @route GET /private
 * @group RBAC
 * @param {string} authorization.headers.required - The basic authorization for the username and password
 * @returns {string} 200 - A private message
 */
router.get('/private', async (req, res, next) => {
  await auth(req, res, next);

  if (req.user && req.user._id){
    res.send('private message for logged in user');
    return;
  } else {
    next({code: 401, status: 'Unauthorized'});
  }
});

/**
 * This route displays a message for users with read privileges
 * @route GET /readonly
 * @group RBAC
 * @param {string} authorization.headers.required - The bearer token authorization for the signed-in user
 * @returns {string} 200 - A private message for users with at least "read" access
 */
router.get('/readonly', async (req, res, next) => {
  await auth(req, res, next);

  if (req.user && req.user.role) {
    if (req.user.canDo('superuser') || req.user.canDo('read')) {
      res.send('Check it out! You can read!');
      return;
    }
  }
  
  next({code: 401, status: 'Unauthorized'});
});

/**
 * This route displays a message for users with create privileges
 * @route POST /create
 * @group RBAC
 * @param {string} authorization.headers.required - The bearer token authorization for the signed-in user
 * @returns {string} 200 - A private message for users with at least "create" access
 */
router.post('/create', async (req, res, next) => {
  await auth(req, res, next);

  if (req.user && req.user.role) {
    if (req.user.canDo('superuser') || req.user.canDo('create')) {
      res.send('Oh wow, you can spring new data into existence! Amazing!');
      return;
    }
  }
  
  next({code: 401, status: 'Unauthorized'});
});

/**
 * This route displays a message for users with update privileges
 * @route PUT /update
 * @group RBAC
 * @param {string} authorization.headers.required - The bearer token authorization for the signed-in user
 * @returns {string} 200 - A private message for users with at least "update" access
 */
router.put('/update', async (req, res, next) => {
  await auth(req, res, next);

  if (req.user && req.user.role) {
    if (req.user.canDo('superuser') || req.user.canDo('update')) {
      res.send('You have the power to change a record, you lucky human!');
      return;
    }
  }
  
  next({code: 401, status: 'Unauthorized'});
});

/**
 * This route displays a message for users with delete privileges
 * @route DELETE /delete
 * @group RBAC
 * @param {string} authorization.headers.required - The bearer token authorization for the signed-in user
 * @returns {string} 200 - A private message for users with at least "delete" access
 */
router.delete('/delete', async (req, res, next) => {
  await auth(req, res, next);

  if (req.user && req.user.role) {
    if (req.user.canDo('superuser') || req.user.canDo('delete')) {
      res.send('You can delete things, are\'nt you powerful?');
      return;
    }
  }

  next({code: 401, status: 'Unauthorized'});
});

/**
 * This route displays a message for users with all the privileges
 * @route DELETE /delete
 * @group RBAC
 * @param {string} authorization.headers.required - The bearer token authorization for the signed-in user
 * @returns {string} 200 - A private message for users with all the access
 */
router.get('/everything', async (req, res, next) => {
  await auth(req, res, next);

  if (req.user && req.user.role) {
    if (req.user.canDo('superuser')) {
      res.send('You\'re a superuser, you super star!');
      return;
    }
  }

  next({code: 401, status: 'Unauthorized'});
});


router.use(throwError);

module.exports = router;