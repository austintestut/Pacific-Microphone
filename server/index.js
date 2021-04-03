/* eslint-disable no-console */
const express = require('express');
require('dotenv').config();

const db = require('../database/index');
const SA = require('./speechAnalysis.js');
const TA = require('./textToneConfig.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Ahoy Matey's");
});

app.post('/speechAnalysisClip', SA.sendClip);

app.get('/textToneAnalysis', (req, res) => {
  const { text } = req.query;
  TA.getTextToneAnalysis(text)
    .then((results) => res.status(200).send(results))
    .catch((error) => res.status(500).send(error));
});

app.listen(port, () => {
  console.log(`We're sailing away from port ${port}`);
});
