'use strict';

const bcrypt = require('bcrypt');

const userSchema = require('../models/user-schema.js');
const Model = require('../models/model.js');

const base64Decoder = (encodedString) => {
  let data = {
    username: '',
    password: '',
  };

  let decodedString = new Buffer.from(encodedString, 'base64').toString();
  let dataPieces = decodedString.split(':');

  data.username = dataPieces[0];
  data.password = dataPieces[1];

  return data;
};

const auth = async (req, res, next) => {
  let authData = req.headers.authorization.split(' ');

  if (authData.length === 2){
    const UsersModel = new Model(userSchema);

    if (authData[0] === 'Basic') {
      let userData = base64Decoder(authData[1]);

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
    } else if (authData[0] === 'Bearer'){
      let tokenData = UsersModel.verifyToken(authData[1]);
      req.user = await UsersModel.read(tokenData._id);
      next();
      return;
    }
  }
}


module.exports = auth;
