'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(app.server);

describe('happy path', () => {
  it('to save a new user', async () => {
    let response = await mockRequest.post('/signup').send({username: 'mUser', password: 'mPass'});

    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.password).toBeDefined();
    expect(response.body.password).not.toBe('mPass');
  });

  it('to retrieve an existing user', async () => {
    let response = await mockRequest.post('/signin').set('Authorization', 'Basic ');

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('mUser');
  });
});

describe('expected failure', () => {
  it('to throw an error if the user doesn\'t exist', () => {

  })
});