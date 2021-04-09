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
    {
    // pointer > 0 &&
    (
      <button type="button" className="button" onClick={playPrevious}>
        {/* <GrCaretPrevious /> */}
        <img src="./images/icons/146-play_.png" alt="playButton" />
      </button>
    )}
    {
    // pointer !== -1 &&
    (
      <button type="button" className="button" onClick={repeat}>
        {/* <GrRefresh /> */}
        <img src="./images/icons/153-recycle-2.png" alt="playButton"  />
      </button>
    )}
    {
    // pointer !== audiosLength - 1 &&
    (
      <button type="button" className="button" onClick={playNext}>
        {/* <GrCaretNext /> */}
        <img src="./images/icons/146-play.png" alt="playButton"  />
      </button>
    )}
    {
    // pointer !== -1 &&
    (
      <button type="button" className="button" onClick={replayScript}>
        {/* <RiArrowGoBackFill /> */}
        <img src="./images/icons/154-refresh.png"  />
      </button>
    )}
  </div>
);

export default LPPlayButtons;
