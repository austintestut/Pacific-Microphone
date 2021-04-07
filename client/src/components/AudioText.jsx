import React from 'react';
import axios from 'axios';
import FormData from 'form-data';

const AudioText = ({ audioToText }) => {
  return (
    audioToText && (
      <div>{audioToText.data.results[0].alternatives[0].transcript}</div>
    )
  );
};

export default AudioText;
