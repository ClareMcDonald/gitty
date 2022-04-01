const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to the github oauth page on login', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(/https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i);
  });

  it('should login and redirect users to /api/v1/posts', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);
  
    expect(res.req.path).toEqual('/api/v1/posts');
  });

  it('should list posts for all users', async () => {
    const agent = request.agent(app);

    await agent
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);
  
    await agent
      .post('/api/v1/posts')
      .send({ text: 'Gotta get down on Friday, everybody is looking forward to the weekend, weekend.' });
    
    const res = await agent
      .get('/api/v1/posts');
    
    expect(res.body).toEqual([{ id: expect.any(String), text: 'Gotta get down on Friday, everybody is looking forward to the weekend, weekend.', username: expect.any(String) }]);
  });

  it('creates a tweet via POST', async () => {
    const agent = request.agent(app);

    await agent
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    const res = await agent
      .post('/api/v1/posts')
      .send({ text: 'Hello, this is my first post!' });
  
    expect(res.body).toEqual({ id: '1', text: 'Hello, this is my first post!', username: 'fake_github_user' });
  });

  it('logs out a user with DELETE', async () => {
    const user = { username: 'clare', photoUrl: 'https://www.placekitten.com/gif/300/300' };

    const agent = request.agent(app);

    await agent
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);
    
    const res = await agent
      .delete('/api/v1/github/delete')
      .send(user);
    
    expect(res.body).toEqual({ status: 404, message: 'Not Found' });
  });
});
