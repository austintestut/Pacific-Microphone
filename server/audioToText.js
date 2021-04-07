const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');
require('dotenv').config();

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_SPEECH_TO_TEXT,
  }),
  serviceUrl: process.env.WATSON_SPEECH_TO_TEXT_URL,
});

const getTextFromAudio = (req, res) => {
  const params = {
    contentType: 'application/octet-stream',
    objectMode: true,
    timestamps: true,
    wordconfidence: true,
    headers: { transferEncoding: 'chunked' },
  };

  const recognizeStream = speechToText.recognizeUsingWebSocket(params);

  fs.createReadStream(`${__dirname}/test.flac`).pipe(recognizeStream);

  recognizeStream.on('data', (event) => {
    onEvent('Data:', event);
    res.status(200).send(JSON.stringify(event, null, 2));
    // We are not getting back the timestamps
  });
  recognizeStream.on('error', (event) => {
    onEvent('Error:', event);
    res.status(500).send(JSON.stringify(event, null, 2));
  });
  recognizeStream.on('close', (event) => {
    onEvent('Close:', event);
  });
};

// Displays events on the console.
function onEvent(name, event) {
  console.log(name, JSON.stringify(event, null, 2));
  console.log(`${event}`);
}

module.exports = {
  getTextFromAudio,
};
