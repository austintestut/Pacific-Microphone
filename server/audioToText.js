const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');
require('dotenv').config();


const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: `${process.env.WATSON_SPEECH_TO_TEXT}`,
  }),
  serviceUrl: process.env.WATSON_SPEECH_TO_TEXT_URL,
});

const getTextFromAudio = (req, res) => {

  const settings = RecognitionSettings({
    contentType: 'application/octet-stream',
    objectMode: true,
    timestamps: true,
    wordconfidence: true
  });

  const params = {
    audio: fs.createReadStream(`${__dirname}/test.flac`),
    settings: settings,
    headers: {transferEncoding: 'chunked'}
  };

  const recognizeStream = speechToText.recognizeUsingWebSocket(params);

  fs.createReadStream(`${__dirname  }/test.flac`).pipe(recognizeStream);

  recognizeStream.on('data', (event) => {
    onEvent('Data:', event);
  });
  recognizeStream.on('error', (event) => {
    onEvent('Error:', event);
  });
  recognizeStream.on('close', (event) => {
    onEvent('Close:', event);
  });
}


  // Displays events on the console.
  function onEvent(name, event) {
    console.log(name, JSON.stringify(event, null, 2));
  }

  module.exports = {
    getTextFromAudio,
  };


