const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_TEXT_ANALYSIS,
  }),
  serviceUrl: process.env.WATSON_TEXT_ANALYSIS_URL,
});

const getTextToneAnalysis = (text) => {
  const toneParams = {
    toneInput: { text },
    contentType: 'application/json',
  };

  return toneAnalyzer
    .tone(toneParams)
    .then((toneAnalysis) => JSON.stringify(toneAnalysis, null, 2))
    .catch((err) => err);
};

module.exports = {
  getTextToneAnalysis,
};
