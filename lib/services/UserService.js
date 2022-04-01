const User = require('../models/User');
const { exchangeCodeForToken, getUserProfile } = require('../utils/github');

module.exports = class UserService {
  static async create(code) {
    const token = await exchangeCodeForToken(code);

    const profile = await getUserProfile(token);

    let user = await User.findByUsername(profile.username);

    if (!user) {
      user = await User.insert(profile);
    }
    return user;
  }
};
