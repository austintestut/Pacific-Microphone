/* eslint-disable no-plusplus */
const axios = require('axios');
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
  DB.Users.update(
    { _id: userId },
    { $push: { listScripts: scriptObj } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
};

const removeScriptFromDb = (req, res) => {
  console.log('in DB function')
  const { userId, scriptObj } = req.body;
  DB.Users.update(
    { _id: userId },
    { $pull: { listScripts: scriptObj } },
    (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
};

const makeTextBlocks = (req, res) => {
  const { userId, title, author, scriptBody } = req.body;

  const text = `\n${scriptBody}`;

  const charList = new Set();
  const blocks = [];
  let rawScript = '';

  const regex = /\n ?[A-Z\d ]+ ?\n/g;
  if (!regex.test(text)) {
    charList.add('SPEAKER');
    rawScript += text;
    blocks.push({
      character: 'SPEAKER',
      text: text.trim(),
    });
  } else {
    const arrOfCharacters = text.match(regex);
    const arrOfDialogue = text.split(regex);
    rawScript += arrOfDialogue.join(' ');

    if (arrOfDialogue[0] === '') arrOfDialogue.shift();

    for (let i = 0; i < arrOfCharacters.length; i++) {
      charList.add(arrOfCharacters[i].trim());
      blocks.push({
        character: arrOfCharacters[i].trim(),
        text: arrOfDialogue[i].trim(),
      });
    }
  }

  const newScriptObj = {
    title,
    author,
    characterList: [...charList],
    talkingBlocks: blocks,
  };

  addScriptToDB(userId, newScriptObj, res);
};

module.exports = {
  scriptFetcher,
  makeTextBlocks,
  removeScriptFromDb,
};
