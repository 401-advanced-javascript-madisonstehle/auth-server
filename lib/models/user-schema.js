'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const roles = require('../../docs/roles.json');

const schema = mongoose.Schema({
  username: { type: 'String', required: true, unique: true },
  password: { type: 'String', required: true },
  email: { type: 'String' },
  role: {type: 'String', required: true, default: 'user', enum: ['admin', 'editor', 'user']}
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

schema.methods.canDo = function(capability){
  for ( let i = 0 ; i < roles.length ; i++ ) {
    if ( roles[i].role === this.role ) {
      return roles[i].capabilities.includes(capability);
    }
  }
  return false;
}

schema.statics.verifyToken = function(token) {
  let tokenContents = jwt.verify(token, process.env.CLIENT_SECRET);
  return tokenContents.data;
};

module.exports = mongoose.model('users', schema);