const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const DB = require('../database/index');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_TEXT_ANALYSIS,
  }),
  serviceUrl: process.env.WATSON_TEXT_ANALYSIS_URL,
});

const getTextToneAnalysis = (req, res) => {
  let { text, title, userId } = req.body;
  text = '\n' + text;
  let rawScript = '';
  const regex = /\n ?[A-Z\d ]+ ?\n/g;
  if (!regex.test(text)) {
    rawScript += text;
  } else {
    const arrOfDialogue = text.split(regex);
    rawScript += arrOfDialogue.join(' ');
  }

  const toneParams = {
    toneInput: { text: rawScript },
    contentType: 'application/json',
  };

  const reshapeSentences = (obj, rawScriptIn) => {
    const reshaped = {};
    const sentences = obj.result.sentences_tone;
    if (sentences) {
      sentences.forEach((s) => {
        reshaped[s.text] = s.tones;
      });
    } else {
      reshaped[rawScriptIn.trim()] = obj.result.document_tone.tones;
    }
    return reshaped;
  };

  const addAnalysisToDB = (obj, resIn) => {
    DB.Users.update(
      { _id: userId },
      {
        $set: { 'listScripts.$[elem].watsonAnalysis': obj },
      },
      {
        arrayFilters: [{ 'elem.title': title }],
      }
    )
      .then((data) => resIn.status(200).send(data))
      .catch((error) => resIn.status(500).send(error));
  };

  return toneAnalyzer
    .tone(toneParams)
    .then((toneAnalysis) => JSON.stringify(toneAnalysis, null, 2))
    .then((results) => reshapeSentences(JSON.parse(results), rawScript))
    .then((results) => addAnalysisToDB(JSON.stringify(results), res));
};

module.exports = {
  getTextToneAnalysis,
};
