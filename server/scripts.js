/* eslint-disable no-plusplus */
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

const addScriptToDB = (userId, scriptObj, res) => {
  //pushes script todatabase
  DB.Users.update({_id: userId}, {$push: {listScripts: scriptObj}}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
}

const makeTextBlocks = (req, res) => {
  //separates script into text blocks by character

  const {userId, title, author, scriptBody} = req.body

  const text = `\n${  scriptBody}`

  const regex = /\n ?[A-Z\d]+ ?\n/g
  const arrOfCharacters = text.match(regex)
  const arrOfDialogue = text.split(regex)

  if (arrOfDialogue[0] === '') arrOfDialogue.shift()

  const blocks = []

  for (let i = 0; i < arrOfCharacters.length; i++) {
      blocks.push({
          character: arrOfCharacters[i].trim(),
          text: arrOfDialogue[i].trim()
      })
  }

  const newScriptObj = {
    title,
    author,
    talkingBlocks: blocks
  }

  addScriptToDB(userId, newScriptObj, res)

}

module.exports = {
  scriptFetcher,
  makeTextBlocks
}