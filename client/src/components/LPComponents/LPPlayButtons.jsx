import React from 'react';
import { GrCaretNext, GrCaretPrevious, GrRefresh } from 'react-icons/gr';
import { RiArrowGoBackFill } from 'react-icons/ri';

const LPPlayButtons = ({
  playNext,
  playPrevious,
  pointer,
  audiosLength,
  repeat,
  replayScript,
}) => (
  <div className="playButtons">
    {pointer > 0 && (
      <button type="button" onClick={playPrevious}>
        <GrCaretPrevious />
      </button>
    )}
    {pointer !== audiosLength - 1 && (
      <button type="button" onClick={playNext}>
        <GrCaretNext />
      </button>
    )}
    {pointer !== -1 && (
      <button type="button" onClick={repeat}>
        <GrRefresh />
      </button>
    )}
    {pointer !== -1 && (
      <button type="button" onClick={replayScript}>
        <RiArrowGoBackFill />
      </button>
    )}
  </div>
);

export default LPPlayButtons;
