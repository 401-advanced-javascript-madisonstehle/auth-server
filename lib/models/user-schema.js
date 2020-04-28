'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const schema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: {type: String},
  lastName: {type: String},
});

schema.pre('save', async function(){
  this.password = await bcrypt.hash(this.password, 10);
});

schema.methods.generateToken = function() {
  let timeout = Date.now() + 5000000;

  return jwt.sign( 
    { exp: timeout, data: { _id: this.id } },
    process.env.CLIENT_SECRET,
  );
};

schema.statics.verifyToken = function(token) {
  let tokenContents = jwt.verify(token, process.env.CLIENT_SECRET);
  return tokenContents.data;
};

module.exports = mongoose.model('users', schema);