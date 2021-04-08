import React from 'react';

const LPPlayButtons = ({ playNext, playPrevious, pointer, audiosLength }) => (
  <div className="playButtons">
    {pointer > 0 && (
      <button type="button" onClick={playPrevious}>
        PlayPrevious
      </button>
    )}
    {pointer !== audiosLength - 1 && (
      <button type="button" onClick={playNext}>
        PlayNext
      </button>
    )}
  </div>
);

export default LPPlayButtons;
