import React from 'react';

const ScriptTalkingBlock = ({ talkingBlock, identifier }) => {
  const { character, text } = talkingBlock;

  if (identifier) {
    return (
      <div id="highLighted" className="talkingBlock">
        <div className="TBcharacter">
          <mark>{character}</mark>
        </div>
        <div className="TBtext">
          <mark>{text}</mark>
        </div>
      </div>
    );
  }

  return (
    <div className="talkingBlock">
      <div className="TBcharacter">{character}</div>
      <div className="TBtext">{text}</div>
    </div>
  );
};

export default ScriptTalkingBlock;
