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
    console.log(res);
    expect(res.req.path).toEqual('/api/v1/posts');
  });

  it('should list posts for all users', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/posts')
      .send('Gotta get down on Friday, everybody is looking forward to the weekend, weekend.');
    
    expect(res.body).toEqual([{ id: expect.any(String), text: 'Gotta get down on Friday, everybody is looking forward to the weekend, weekend.', username: expect.any(String) }]);
  });
});
