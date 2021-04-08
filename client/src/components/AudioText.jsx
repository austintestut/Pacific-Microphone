import React from 'react';
import axios from 'axios';
import FormData from 'form-data';

const AudioText = ({ audioToText }) => (
    audioToText && (
      <div id="audioTextDisplay">
        {audioToText.data.results.map(result => {
          const regEx = /who|what|when|where|why|how/i;
          let transcript = result.alternatives[0].transcript.split(' ');
          transcript.pop();
          let firstWord = transcript[0];
          const firstLetter = firstWord[0].toUpperCase();
          firstWord = firstLetter + firstWord.substring(1, firstWord.length);
          transcript.shift();
          transcript.unshift(firstWord);
          transcript = transcript.join(' ');

          if (regEx.test(firstWord)) {
            transcript += '? ';
          } else {
            transcript += '. ';
          }

          return <p>{transcript}</p>
        })}
      </div>
    )
  );

export default AudioText;
