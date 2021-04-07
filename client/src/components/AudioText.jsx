import React from 'react';
import axios from 'axios';
import FormData from 'form-data';

const AudioText = ({ fullBlob, blobURL, sendDataToMainPage, sendDataToRecorder, audioToText }) => {
  if (fullBlob) {

    fetch(blobURL)
    .then(res => {
      return res.blob()
    })
      .then(buffer => {

        const data = new FormData()
        data.append(
          'webm',
          new File([buffer], 'AudioToText.webm', {
            type: 'audio/webm',
            enctype: "multipart/form-data",
            lastModified: Date.now(),
          })
        );
        axios({
          method: 'post',
          url: '/audioToText',
          data,
        })
        .then(response => {
          sendDataToMainPage(response, 'audioToText');
          sendDataToRecorder(null, 'fullBlob');
        })
        .catch(error => {
          console.error(error)
        })

      })


  }

  return (
    <div>{'this'}</div>
    //audioToText.data.results[0].transcript
  )
}

export default AudioText;