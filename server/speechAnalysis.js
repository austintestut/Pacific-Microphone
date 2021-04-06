const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const Mp32Wav = require('mp3-to-wav');

// The audio data that can be analyzed by the API has to respect the following specifications:
// ・PCM WAVE format, 16bit
//  Data size of 1.9MB or less
// ・PCM_FLOAT, PCM_SIGNED or PCM_UNSIGNED format
// ・The recording time is less than 5.0 seconds
// ・The sampling frequency is 11025 Hz
// ・Number of channels : 1 (monophonic sound)

const sendClip = (req, res) => {
  const data = new FormData();
  data.append('apikey', process.env.WEB_EMPATH);
  const file = req.files.mp3;

  file.mv(`${__dirname}/test.mp3`, () => {
    const mp32Wav = new Mp32Wav(`${__dirname}/test.mp3`);
    mp32Wav
      .decodeMp3(`${__dirname}/test.mp3`)
      .then((dat) => mp32Wav.saveForWav(dat.data, __dirname, 'test', 11025, 1))
      .then((filePath) => {
        data.append('wav', fs.createReadStream(filePath));
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
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  });
};

module.exports = {
  sendClip,
};
