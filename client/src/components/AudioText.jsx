import React from 'react';
import axios from 'axios';
import FormData from 'form-data';

const AudioText = ({ audioToText }) => (
    audioToText && (
      <div id="audioTextDisplay">
        {audioToText.data.results.map(result => (
           <p>{result.alternatives[0].transcript}</p>
          ))}
      </div>
    )
  );

export default AudioText;
