// eslint-disable-next-line import/no-unresolved
const mongoose = require('mongoose');

mongoose.connect(process.env.DBTOKEN);

const UserSchema = mongoose.Schema({
  userName: String,
});

const Users = mongoose.model('Users', UserSchema);

module.exports = {};
