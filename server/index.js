/* eslint-disable no-console */
const express = require('express');
require('dotenv').config();

const passport = require('passport');
const cookieSession = require('cookie-session');
require('../passport-setup.js');
const { authCheck } = require('./middleware');

const DB = require('../database/index');
const SA = require('./speechAnalysis.js');
const TA = require('./textToneConfig.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.use(
  cookieSession({
    name: 'microphone-session',
    keys: ['addahiddenandbettercookiekeyhere'],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send("Ahoy Matey's");
});

app.post('/speechAnalysisClip', SA.sendClip);

app.get('/textToneAnalysis', (req, res) => {
  const { text } = req.query;
  TA.getTextToneAnalysis(text)
    .then((results) => res.status(200).send(results))
    .catch((error) => res.status(500).send(error));
});

app.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/loggedin');
});

app.get('/loggedin', authCheck, (req, res) => {
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`We're sailing away from port ${port}`);
});
