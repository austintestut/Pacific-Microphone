import React from 'react';
import axios from 'axios';
import FormData from 'form-data';

const AudioText = ({ audioToText }) => (
    audioToText && (
      <div>
        <div>
        {audioToText.data.results.map(result => (
           {result.alternatives[0].transcript}
          ))}
        </div>
      </div>
    )
  );

export default AudioText;
