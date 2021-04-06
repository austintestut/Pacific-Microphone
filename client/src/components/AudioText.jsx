import React from 'react';
import axios from 'axios';
import FormData from 'form-data';

const AudioText = function ({ data, blobURL, buffer, blob  }) {

  if(data !== null) {

    // let data1 = data.get('mp3')

    axios({
      method: 'post',
      url: '/audioToText',
      data: {data: data1 },
      // contentType: 'application/octet-stream',
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.error(error)
    })

  }

  return (
    <div>Audio Text Output Here</div>
  )

}

export default AudioText;