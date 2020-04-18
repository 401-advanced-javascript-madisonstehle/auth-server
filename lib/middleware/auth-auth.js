'use strict';

const bcrypt = require('bcrypt');

const userSchema = require('../models/user-schema.js');
const Model = require('../models/model.js');

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

const auth = async (req, res, next) => {
  let basicAuth = req.headers.authorization.split(' ');

  if (basicAuth.length === 2 && basicAuth[0] === 'Basic') {
    const UsersModel = new Model(userSchema);
    let userData = base64Decoder(basicAuth[1]);

    switch(req.route.path){
      case '/signup':
        let user = await UsersModel.create({...userData, ...req.body});
        return user;
      case '/signin':
        let possibleUsers = await UsersModel.readByQuery({ username: userData.username });
    
        for (let i = 0; i < possibleUsers.length; i++) {
          let match = await bcrypt.compare(userData.password, possibleUsers[i].password);

          if (match) {
            req.user = possibleUsers[i];
            break;
          }
        }
        break;
      default:
        res.status(404);
        res.end();
        return;
    }
  }

  next();
}


module.exports = auth;