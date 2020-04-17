const generateSwagger = (app) => { 
  const expressSwagger = require('express-swagger-generator')(app);

  let options = {
      swaggerDefinition: {
          info: {
              description: 'Simple authentication app',
              title: 'auth-server',
              version: '1.0.0',
          },
          host: 'localhost:3000',
          basePath: '/',
          produces: [ 'application/json', 'text/html' ],
          schemes: ['http', 'https'],
          securityDefinitions: {
              JWT: {
                  type: 'apiKey',
                  in: 'header',
                  name: 'Authorization',
                  description: "",
              }
          }
      },
      basedir: __dirname, //app absolute path
      files: ['../lib/server.js', '../lib/routes/*'] //Path to the API handle folder
  };

  expressSwagger(options);
};

module.exports = generateSwagger;
