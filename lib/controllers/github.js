const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService');
const { sign } = require('../utils/jwt');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`);
  })

  .get('/login/callback', async (req, res, next) => {
    try {
      const user = await UserService.create(req.query.code);

      res
        .cookie(process.env.COOKIE_NAME, sign(user), {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS
        })
        .redirect('/api/v1/posts');
    } catch (error) {
      next(error);   
    }
  })
    
//   .get('/verify', authenticate, (req, res, next) => {
//     res.send(req.user);
//   })
    
  .delete('/', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully' });
  });
