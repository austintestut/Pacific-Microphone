/* eslint-disable no-plusplus */
const DB = require('./index');

const makeTextBlocks = (title, author, scriptBody) => {

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
    title: title,
    author: author,
    talkingBlocks: blocks
  }
  //left off here on saturday. newScriptObj needs to be added to the users listScript array in the DB. We believe we can find the correct doc using username from App.jsx.

}

module.exports = {
  makeTextBlocks
}