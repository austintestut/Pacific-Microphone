const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_TEXT_ANALYSIS,
  }),
  serviceUrl: process.env.WATSON_TEXT_ANALYSIS_URL,
});

const getTextToneAnalysis = (req, res) => {
  const toneParams = {
    toneInput: { text: req.body.text },
    contentType: 'application/json',
  };

  return toneAnalyzer
    .tone(toneParams)
    .then((toneAnalysis) => JSON.stringify(toneAnalysis, null, 2))
    .then((results) => res.status(200).send(results))
    .catch((error) => res.status(500).send(error));
};

module.exports = {
  getTextToneAnalysis,
};
