const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const Mp32Wav = require('mp3-to-wav');
var sox = require('sox');

// these apps need to be installed as well
// sudo apt install sox
// sudo apt-get install libsox-fmt-mp3

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
    const job = sox.transcode(
      `${__dirname}/test.mp3`,
      `${__dirname}/test.wav`,
      {
        sampleRate: 11025,
        format: 'wav',
        channelCount: 1,
        // compressionQuality: 5, // see `man soxformat` search for '-C' for more info
      }
    );
    job.on('error', (err) => {
      console.error(err);
    });
    job.on('progress', (amountDone, amountTotal) => {
      console.log('progress', amountDone, amountTotal);
    });
    job.on('src', (info) => {
      /* info looks like:
      {
        format: 'wav',
        duration: 1.5,
        sampleCount: 66150,
        channelCount: 1,
        bitRate: 722944,
        sampleRate: 44100,
      }
      */
    });
    job.on('dest', (info) => {
      /* info looks like:
      {
        sampleRate: 44100,
        format: 'mp3',
        channelCount: 2,
        sampleCount: 67958,
        duration: 1.540998,
        bitRate: 196608,
      }
      */
    });
    job.on('end', () => {
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
      console.log('all done');
    });
    job.start();
    // const mp32Wav = new Mp32Wav(`${__dirname}/test.mp3`);
    // debugger;
    // mp32Wav
    //   .decodeMp3(`${__dirname}/test.mp3`)
    //   .then((dat) => {
    //     debugger;
    //     return mp32Wav.saveForWav(
    //       dat.data,
    //       __dirname,
    //       'test',
    //       dat.sampleRate,
    //       1
    //     );
    //   })
    //   .then((filePath) => {

    // data.append('wav', fs.createReadStream(filePath));
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
    //     res.status(501).send(err);
    //   });
    //   })
    //   .catch((err) => {
    //     res.status(501).send(err);
    //   });
  });
};

module.exports = {
  sendClip,
};
