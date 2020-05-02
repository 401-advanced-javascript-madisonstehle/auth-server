'use strict';

require('dotenv').config();

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(app.server);

describe('endpoints', () => {
  it('to save a new user', async () => {
    let response = await mockRequest.post('/signup').set('Authorization', 'Basic bVVzZXI6bVBhc3M=').send({
      username: 'mUser', 
      password: 'mPass',
      role: 'admin'
    });

    expect(response.status).toBe(201);
    expect(response.body.user._id).toBeDefined();
    expect(response.body.user.password).toBeDefined();
    expect(response.body.user.password).not.toBe('mPass');
  });

  it('to retrieve an existing user', async () => {
    let response = await mockRequest.post('/signin').set('Authorization', 'Basic bVVzZXI6bVBhc3M=');

    expect(response.status).toBe(200);
    expect(response.body.user.username).toBe('mUser');
  });

  it('to retrieve all users', async () => {
    let response = await mockRequest.get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});