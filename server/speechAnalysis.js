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
  debugger;
  const data = new FormData();
  data.append('apikey', process.env.WEB_EMPATH);
  const file = req.files.mp3;
  file.mv(`${__dirname}/test.mp3`);

  const mp32Wav = new Mp32Wav(`${__dirname}/test.mp3`, `${__dirname}/test.wav`);
  debugger;

  mp32Wav
    .decodeMp3()
    .then((data) => {
      debugger;
    })
    .catch((err) => {
      debugger;
    });

  // const filed = new File(file.data, 'file.mp3', {
  //   type: file.data.type,
  //   lastModified: Date.now(),
  // });
  // debugger;
  // mp32Wav.then((data) => {
  //   debugger;
  // });

  // data.append('wav', fs.createReadStream(mp32Wav));
  // // data.append('wav', file);
  // debugger;
  // axios({
  //   method: 'post',
  //   url: process.env.WEB_EMPATH_URL,
  //   headers: {
  //     ...data.getHeaders(),
  //   },
  //   data,
  // })
  //   .then((response) => {
  //     res.status(201).send(response.data);
  //   })
  //   .catch((err) => {
  //     debugger;
  //     res.status(501).send(err);
  //   });
};

module.exports = {
  sendClip,
};
