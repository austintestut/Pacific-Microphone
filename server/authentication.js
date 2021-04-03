const passport = require('passport');
require('../passport-setup.js');

const authScope = passport.authenticate('google', {
  scope: ['profile', 'email'],
});
const googleAuth = passport.authenticate('google');
const loggedinRedirect = (req, res) => {
  res.redirect('/loggedin');
};
const sendUser = (req, res) => {
  res.send(req.user);
};
const homeRedirect = (req, res) => {
  res.redirect('/');
};
const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports = {
  authScope,
  googleAuth,
  loggedinRedirect,
  sendUser,
  homeRedirect,
  logout,
};
