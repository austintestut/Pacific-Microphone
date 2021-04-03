// eslint-disable-next-line import/no-unresolved
const mongoose = require('mongoose');

mongoose.connect(process.env.DBTOKEN);

const ScriptSchema = mongoose.Schema({
  title: String,
  author: String,
  talkingBlocks: [
    {
      character: String,
      text: String,
    },
  ],
});

const UserSchema = mongoose.Schema({
  userName: String,
  googleId: String,
  listScripts: [ScriptSchema],
});

const Scripts = mongoose.model('Script', ScriptSchema);

const Users = mongoose.model('Users', UserSchema);

module.exports = {
  Users,
  Scripts
};
