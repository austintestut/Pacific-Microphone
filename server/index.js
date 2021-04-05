/* eslint-disable no-console */
const express = require('express');
require('dotenv').config();

const passport = require('passport');
const cookieSession = require('cookie-session');
const fileUpload = require('express-fileupload');
const auth = require('./authentication');

const DB = require('../database/index');
const SA = require('./speechAnalysis.js');
const TA = require('./textToneConfig.js');
const LP = require('./livePerformance.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.use(
  cookieSession({
    name: 'microphone-session',
    keys: [`${process.env.COOKIE_KEY}`],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

app.get('/', (req, res) => {
  res.send("Ahoy Matey's");
});

// app.get('/livePerformance', LP.getAudio);

app.post('/speechAnalysisClip', SA.sendClip);

app.post('/textToneAnalysis', TA.getTextToneAnalysis);

app.get('/google', auth.authScope);

app.get('/google/callback', auth.googleAuth, auth.loggedinRedirect);

app.get('/user', auth.authCheck, auth.sendUser);

app.get('/loggedin', auth.authCheck, auth.homeRedirect);

app.get('/logout', auth.logout);

app.listen(port, () => {
  console.log(`We're sailing away from port ${port}`);
});
