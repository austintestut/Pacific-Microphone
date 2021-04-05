const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const db = require('../database/index.js');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_TEXT_TO_SPEECH,
  }),
  serviceUrl: process.env.WATSON_TEXT_TO_SPEECH_URL,
});

const watsonGetAudio = (text, title, index) => {
  const params = {
    text,
    voice: 'en-US_AllisonVoice', // Optional voice
    accept: 'audio/wav',
  };

  return (
    textToSpeech
      .synthesize(params)
      .then((response) => {
        const audio = response.result;
        return textToSpeech.repairWavHeaderStream(audio);
      })
      .then((repairedFile) => {
        const filePath = `${__dirname}/../public/livePerformanceAudio/${
          title + index
        }.wav`;
        fs.writeFileSync(filePath, repairedFile);
        console.log('audio.wav written with a corrected wav header');
        return filePath;
      })
      //grab audio file)
      .catch((err) => {
        // console.log('watson err: ', err);
      })
  );
};

// const UserSchema = mongoose.Schema({
//   userName: String,
//   googleId: String,
//   listScripts: [
//     ScriptSchema
//   ]
// });

// user1 'story1' -> contents1
// user2 'story1' -> contents2

// users -> script from list -> grab

const getAudio = (req, res) => {
  debugger;
  // retrieve req.query.title, req.query.userCharacter, req.query.userName or googleId
  // find user database with userName or id
  // find the script with scriptName

  // const ScriptSchema = mongoose.Schema({
  //   title: String,
  //   author: String,
  //   talkingBlocks: [
  //     {
  //       character: String,
  //       text: String
  //     }
  //   ]
  // })
  const script = JSON.parse(req.query.script);
  // console.log('------REQ.QUERY----- : ', script);
  let talkingBlockPromises = [];
  // const { talkingBlocks } = req.query;
  for (let i = 0; i < script.talkingBlocks.length; i += 1) {
    if (script.talkingBlocks[i].character !== req.query.userCharacter) {
      talkingBlockPromises.push(
        watsonGetAudio(script.talkingBlocks[i].text, script.title, i)
      );
    }
  }
  return Promise.all(talkingBlockPromises).then((response) => {
    console.log('Promise.all responce: ', response);
  });

  // get parsed script from the database based on scriptName

  // get rid of text blocks for userActor

  //  [ {
  //     "_id": "6068c058618ca4309f7be00d",
  //     "talkingBlocks": [
  //         [
  //             {
  //                 "_id": "6068c058618ca4309f7be00f",
  //                 "character": "sma",
  //                 "text": "hello world"
  //             }
  //         ]
  //     ]
  // } ]

  // let talkingBlockPromises = []
  // iterate over talkingBlock
  // at each element if talkingBlock[i].character !== userCharacter
  // talkingBlockPromises.push(watsonGetAudio(talkingBlock[i].text))
  // Promise.all(talkingBlockPromises)
  //  -> [audio, audio, audio]

  // watsonTextToSpeechPromises = []
  // push all queries you want to preform into watsonTextToSpeechPromises
  // Promise.all(watsonTextToSpeechPromises)
  // ->returnedArry = [result for first element, resutlt from second element, ....]
};

module.exports = {
  getAudio,
};
