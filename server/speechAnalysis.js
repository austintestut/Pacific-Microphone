const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const data = new FormData();
data.append('apikey', process.env.WEB_EMPATH);

// The audio data that can be analyzed by the API has to respect the following specifications:
// ・PCM WAVE format, 16bit
//  Data size of 1.9MB or less
// ・PCM_FLOAT, PCM_SIGNED or PCM_UNSIGNED format
// ・The recording time is less than 5.0 seconds
// ・The sampling frequency is 11025 Hz
// ・Number of channels : 1 (monophonic sound)

const sendClip = (req, res) => {
  data.append('wav', fs.createReadStream(`${__dirname}/test.wav`));

  axios({
    method: 'post',
    url: process.env.WEB_EMPATH_URL,
    headers: {
      ...data.getHeaders(),
    },
    data,
  })
    .then((response) => {
      res.status(201).send(response.data);
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};

module.exports = {
  sendClip,
};
