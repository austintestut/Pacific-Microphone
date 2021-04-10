const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const { Users, Scripts } = require('./database/index');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      throw ('could not deserialize user', err);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      Users.findOne({ googleId: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            new Users({
              userName: profile.displayName,
              googleId: profile.id,
              listScripts: [
                new Scripts({
                  title: 'Hamlet',
                  author: 'Shakespeare',
                  watsonAnalysis:
                    '{"Who\'s there?":[{"score":0.801599,"tone_id":"analytical","tone_name":"Analytical"},{"score":0.641599,"tone_id":"tentative","tone_name":"Tentative"}],"Nay, answer me!":[{"score":0.991736,"tone_id":"anger","tone_name":"Anger"}],"Stand, and unfold yourself.":[{"score":0.859999,"tone_id":"confident","tone_name":"Confident"}],"Long live the king!":[{"score":0.909999,"tone_id":"confident","tone_name":"Confident"},{"score":0.859999,"tone_id":"joy","tone_name":"Joy"}],"Bernardo?":[{"score":0.609999,"tone_id":"analytical","tone_name":"Analytical"},{"score":0.729999,"tone_id":"tentative","tone_name":"Tentative"}],"He.":[{"score":0.529999,"tone_id":"confident","tone_name":"Confident"}],"You come most carefully upon your hour.":[{"score":0.681699,"tone_id":"tentative","tone_name":"Tentative"}],"\'Tis now struck twelve; get thee to bed, Francisco.":[{"score":0.501599,"tone_id":"analytical","tone_name":"Analytical"},{"score":0.801599,"tone_id":"sadness","tone_name":"Sadness"}],"For this relief much thanks, \'tis bitter cold, and I am sick at heart.":[{"score":0.811599,"tone_id":"joy","tone_name":"Joy"},{"score":0.561599,"tone_id":"fear","tone_name":"Fear"},{"score":0.559731,"tone_id":"sadness","tone_name":"Sadness"}],"Have you had quiet guard?":[{"score":0.621599,"tone_id":"analytical","tone_name":"Analytical"}],"Not a mouse stirring.":[{"score":0.801599,"tone_id":"joy","tone_name":"Joy"}],"Well, good night.":[{"score":0.788455,"tone_id":"joy","tone_name":"Joy"}],"If you do meet Horatio and Marcellus, the rivals of my watch, bid them make haste.":[{"score":0.699579,"tone_id":"joy","tone_name":"Joy"},{"score":0.801827,"tone_id":"analytical","tone_name":"Analytical"}]}',
                  characterList: ['BERNARDO', 'FRANCISCO'],
                  talkingBlocks: [
                    {
                      character: 'BERNARDO',
                      text: "Who's there?",
                    },
                    {
                      character: 'FRANCISCO',
                      text: 'Nay, answer me! Stand, and unfold yourself.',
                    },
                    {
                      character: 'BERNARDO',
                      text: 'Long live the king!',
                    },
                    {
                      character: 'FRANCISCO',
                      text: 'Bernardo?',
                    },
                    {
                      character: 'BERNARDO',
                      text: 'He.',
                    },
                    {
                      character: 'FRANCISCO',
                      text: 'You come most carefully upon your hour.',
                    },
                    {
                      character: 'BERNARDO',
                      text:
                        "'Tis now struck twelve; get thee to bed, Francisco.",
                    },
                    {
                      character: 'FRANCISCO',
                      text:
                        "For this relief much thanks, 'tis bitter cold, and I am sick at heart.",
                    },
                    {
                      character: 'BERNARDO',
                      text: 'Have you had quiet guard?',
                    },
                    {
                      character: 'FRANCISCO',
                      text: 'Not a mouse stirring.',
                    },
                    {
                      character: 'BERNARDO',
                      text:
                        'Well, good night. If you do meet Horatio and Marcellus, the rivals of my watch, bid them make haste.',
                    },
                  ],
                }),
              ],
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
              });
          }
        })
        .catch((err) => {
          throw ('could not verify user', err);
        });
    }
  )
);
