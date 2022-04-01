const { verify } = require('../utils/jwt');

module.exports = (req, res, next) => {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];
    const user = verify(cookie);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
