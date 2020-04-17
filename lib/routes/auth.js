'use strict';
// ========== Esoteric Resources ==========
const express = require('express');

// ========== Internal Resources ==========
const auth = require('../middleware/auth-auth.js');

// ========== Setup ==========
const router = express.Router();

// ========== Routes =========
router.post('/signup', async (req, res, next) => {
  try{
    let user = await auth(req, res, next);  
    res.send(user);
  } 
  catch(e) {
    console.error(e);
  }
});

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
})



module.exports = router;