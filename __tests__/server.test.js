'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(app.server);

describe('endpoints', () => {
  it('to save a new user', async () => {
    let response = await mockRequest.post('/signup').set('Authorization', 'Basic bVVzZXI6bVBhc3M=').send({
      username: 'mUser', 
      password: 'mPass'
    });

    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.password).toBeDefined();
    expect(response.body.password).not.toBe('mPass');
  });

  it('to retrieve an existing user', async () => {
    let response = await mockRequest.post('/signin').set('Authorization', 'Basic bVVzZXI6bVBhc3M=');

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('mUser');
  });

  it('to retrieve all users', async () => {
    let response = await mockRequest.get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});