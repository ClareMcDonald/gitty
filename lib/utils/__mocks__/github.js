/* eslint-disable no-console */
const exchangeCodeForToken = async (code) => {
  console.log(`MOCK INVOKED: exchangeCodeForToken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};
  
const getUserProfile = async (token) => {
  console.log(`MOCK INVOKED: getGithubProfile(${token})`);
  return {
    username: 'fake_github_user',
    photoUrl: 'https://www.placecage.com/gif/300/300'
    // email: 'not-real@example.com',
  };
};
  
module.exports = { exchangeCodeForToken, getUserProfile };
