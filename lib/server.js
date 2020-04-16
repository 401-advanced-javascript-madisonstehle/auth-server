'use strict';

// ========== Esoteric Resources ==========
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// ========== Internal Resources ==========
const authRouter = require('./routes/auth.js');

// ========== Global Middleware ==========
let app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// ========== Routes ==========
app.get('/', (req, res, next) => {
  res.send('Helloooooooooo!');
})

app.use(authRouter);

// ========== Error Handling ==========


// ========== Export ==========
module.exports = {
  server: app,
  start: (port, mongodb) => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));

    let options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }

    mongoose.connect(mongodb, options);
  }
}