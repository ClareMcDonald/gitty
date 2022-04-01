const User = require('../models/User');
const { exchangeCodeForToken, getUserProfile } = require('../utils/github');

module.exports = class UserService {
  static async create(code) {
    const token = await exchangeCodeForToken(code);
    
    const { username, photoUrl } = await getUserProfile(token);
    
    let user = await User.findByUsername(username);

    if (!user) {
      user = await User.insert({ username, photoUrl });

    }
    return user;
  }
};
