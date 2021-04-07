import React from 'react';
import axios from 'axios';
import FormData from 'form-data';

const AudioText = ({ fullBlob, blobURL }) => {

  if (fullBlob) {
    const data = new FormData()
    data.append(
      'mp3',
      blobURL
    );


    axios({
      method: 'post',
      url: '/audioToText',
      data,
    })
    .then(response => {
      debugger;
      console.log(response)
    })
    .catch(error => {
      debugger;
      console.error(error)
    })

  }

  return (
    <div>Audio Text Output Here</div>
  )

}

export default AudioText;