const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_TEXT_TO_SPEECH
  }),
  serviceUrl: process.env.WATSON_TEXT_TO_SPEECH_URL
});

const watsonGetAudio = (text) => {
  const params = {
    text,
    voice: 'en-US_AllisonVoice', // Optional voice
    accept: 'audio/wav'
  };

  return textToSpeech
    .synthesize(params)
    .then(response => {
      const audio = response.result;
      return textToSpeech.repairWavHeaderStream(audio);
    })
    .then(repairedFile => {
      fs.writeFileSync('audio.wav', repairedFile);
      console.log('audio.wav written with a corrected wav header');
    })
    //grab audio file)
    .catch(err => {
      console.log(err);
    });
}

// const getAudio = (req, res) => {
  // retrieve req.query.scriptName, req.query.userActor
  // get parsed script from the database based on scriptName

  // get rid of text blocks for userActor

  // watsonTextToSpeechPromises = []
  // push all queries you want to preform into watsonTextToSpeechPromises
  // Promise.all(watsonTextToSpeechPromises)
  // ->returnedArry = [result for first element, resutlt from second element, ....]
// }

module.exports {
  // getAudio
}