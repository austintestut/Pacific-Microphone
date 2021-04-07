import React from 'react';
import axios from 'axios';
import FormData from 'form-data';

const AudioText = ({ buffer }) => {
  if (buffer) {
    // debugger;
    const data = new FormData()
    data.append(
      'mp3',
      new File(buffer, 'AudioToText.mp3', {
        type: 'audio/mpeg',
        enctype: "multipart/form-data",
        lastModified: Date.now(),
      })
    );
    // debugger;
    axios({
      method: 'post',
      url: '/audioToText',
      data,
    })
    .then(response => {
      // debugger;
      console.log(response)
    })
    .catch(error => {
      // debugger;
      console.error(error)
    })

  }

  return (
    <div>Audio Text Output Here</div>
  )

}

export default AudioText;