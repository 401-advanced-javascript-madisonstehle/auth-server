'use strict';
// ========== Esoteric Resources ==========
const express = require('express');
const bcrypt = require('bcrypt');

const Model = require('../models/model.js');
const userSchema = require('../models/user-schema.js');

const UsersModel = new Model(userSchema)
const router = express.Router();

const base64Decoder = (encodedString) => {
  let data = {
    username: '',
    password: ''
  };

  let decodedString = new Buffer.from(encodedString, 'base64').toString();
  let dataPieces = decodedString.split(':');

  data.username = dataPieces[0];
  data.password = dataPieces[1];

  return data;
}

// ========== Routes =========

router.post('/signup', async (req, res, next) => {
  try{
    let basicAuth = req.headers.authorization.split(' ');
  
    if (basicAuth.length === 2 && basicAuth[0] === 'Basic') {
      let userData = base64Decoder(basicAuth[1]);
      let user = await UsersModel.create({...userData, ...req.body});
      res.send(user);
    }
  } 
  catch(e) {
    console.error(e);
  }
});

router.post('/signin', async (req, res, next) => {
  try {
    let basicAuth = req.headers.authorization.split(' ')
    
    if (basicAuth.length === 2 && basicAuth[0] === 'Basic') {
      let userData = base64Decoder(basicAuth[1]);
      let possibleUsers = await UsersModel.readByQuery({ username: userData.username });
  
      for (let i = 0; i < possibleUsers.length; i++) {
        let match = await bcrypt.compare(userData.password, possibleUsers[i].password);

        if (match) {
          req.user = possibleUsers[i];
          break;
        }
      }
  
      if (req.user) {
        res.status(200);
        res.send(req.user);
      }
    
    }
  }
  catch(e) {
    console.error(e);
  }
})



module.exports = router;