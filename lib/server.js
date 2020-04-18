'use strict';

// ========== Esoteric Resources ==========
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// ========== Internal Resources ==========
const generateSwagger = require('../docs/swagger.js');
const throw404 = require('./middleware/404.js');
const throwError = require('./middleware/error-handler.js');
const authRouter = require('./routes/auth.js');
const userSchema = require('./models/user-schema.js');
const Model = require('./models/model.js');

// ========== Global Middleware ==========
let app = express();

generateSwagger(app);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const UsersModel = new Model(userSchema);
// ========== Routes ==========
/**
 * This route gives you a standard home page
 * @route GET /
 * @produces text/html
 * @returns {object} 200 - HTML tags with a welcome message
 */
app.get('/', (req, res, next) => {
  res.send('Helloooooooooo!');
});

app.get('/users', async (req, res, next) => {
  try {
    let results = await UsersModel.readByQuery({});
    res.status(200);
    res.send(results);
  }
  catch(e) {
    app.use({code: 404, status: 'Not Found'}, throwError);
  }
});

app.use(authRouter);

// ========== Error Handling ==========
app.use('*', throw404);

// ========== Export ==========
module.exports = {
  server: app,
  start: (port, mongodb) => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));

    let options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    mongoose.connect(mongodb, options);
  },
};
