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

  return textToSpeech
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
      console.log(`./livePerformanceAudio/${title + index}.wav`);
      return {
        path: `./livePerformanceAudio/${title + index}.wav`,
        audioIndex: index,
      };
    })
    .catch((err) => {
      console.log('watson err: ', err);
    });
};

const getAudio = (req, res) => {
  // console.log(req.query, script);
  const script = JSON.parse(req.query.script);
  let talkingBlockPromises = [];
  for (let i = 0; i < script.talkingBlocks.length; i += 1) {
    if (script.talkingBlocks[i].character !== req.query.userCharacter) {
      talkingBlockPromises.push(
        watsonGetAudio(script.talkingBlocks[i].text, script.title, i)
      );
    }
  }
  return Promise.all(talkingBlockPromises).then((response) => {
    res.send(response);
  });
};

module.exports = {
  getAudio,
};
