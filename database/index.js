// eslint-disable-next-line import/no-unresolved
const mongoose = require('mongoose');

mongoose.connect(process.env.DBTOKEN);

const ScriptSchema = mongoose.Schema({
  title: { type: String, unique: true },
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

// Users.create([
//   {
//     userName: 'Sam',
//     googleId: 'whatever',
//     listScripts: [
//       {
//         title: 'hello',
//         author: 'sam',
//         talkingBlocks: [
//           {
//             character: 'sma',
//             text: 'hello world',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     userName: 'Chandler',
//     googleId: 'whatever',
//     listScripts: [
//       {
//         title: 'hi',
//         author: 'sam',
//         talkingBlocks: [
//           {
//             character: 'sma',
//             text: 'hello world',
//           },
//         ],
//       },
//     ],
//   },
// ]);

module.exports = {
  Users,
};
