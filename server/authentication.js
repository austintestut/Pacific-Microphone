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
  res.send({ userName: req.user.userName, _id: req.user._id });
};
const homeRedirect = (req, res) => {
  res.redirect('/');
};
const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
const authCheck = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = {
  authScope,
  googleAuth,
  loggedinRedirect,
  sendUser,
  homeRedirect,
  logout,
  authCheck,
};
