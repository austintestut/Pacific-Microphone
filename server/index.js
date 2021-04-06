/* eslint-disable no-console */
const express = require('express');
require('dotenv').config();

const passport = require('passport');
const cookieSession = require('cookie-session');
const fileUpload = require('express-fileupload');
const auth = require('./authentication');
const { scriptFetcher, makeTextBlocks } = require('./scripts.js');

const DB = require('../database/index');
const SA = require('./speechAnalysis.js');
const TA = require('./textToneConfig.js');
const LP = require('./livePerformance.js');
const AT = require('./audioToText.js');

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

app.get('/livePerformance', LP.getAudio);

app.post('/speechAnalysisClip', SA.sendClip);

app.post('/textToneAnalysis', TA.getTextToneAnalysis);


app.post('/audioToText', AT.getTextFromAudio);

app.post('/uploadScript', makeTextBlocks);


app.get('/google', auth.authScope);

app.get('/google/callback', auth.googleAuth, auth.loggedinRedirect);

app.get('/user', auth.authCheck, auth.sendUser);

app.get('/loggedin', auth.authCheck, auth.homeRedirect);

app.get('/logout', auth.logout);

app.get('/scripts/:user_id', scriptFetcher);

app.listen(port, () => {
  console.log(`We're sailing away from port ${port}`);
});

/* =========== Script updating template =========== */
// can we use insertMany within the Scripts model?

// let script1 = new DB.Scripts({
//    "title": "TEST SCRIPT",
//    "author": "Dr. Mr. Austin Testut",
//    "talkingBlocks": [
//      {
//        "character": "AUSTIN",
//        "text": "Look at me. I am the captain now.",
//      },
//      {
//        "character": "NOT AUSTIN",
//        "text": "Yes you are the captain.",
//      }
//    ],
//  })

//  let script2 = new DB.Scripts({
//    "title": "TEST SCRIPT II: THE SEQUEL",
//    "author": "Dr. Mr. Austin Testut",
//    "talkingBlocks": [
//      {
//        "character": "AUSTIN",
//        "text": "I have given up piracy to chase my dreams of becoming a secure storage container that can only be opened by inputting a specific sequence of numbers.",
//      },
//      {
//        "character": "NOT AUSTIN",
//        "text": "Be safe.",
//      }
//    ],
//  })

// DB.Users.findByIdAndUpdate("6068bb48f90a50151c79814b", {"listScripts": [script1, script2]}, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });
