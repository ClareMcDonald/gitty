const { verify } = require('../utils/jwt');
// const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];

    const user = verify(cookie, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
