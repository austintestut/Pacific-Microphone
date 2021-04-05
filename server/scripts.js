const DB = require('../database/index');

const scriptFetcher = (req, res) => {
  DB.Users.find({ _id: req.params.user_id }, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(result[0].listScripts);
    }
  });
};

module.exports = {
  scriptFetcher,
}