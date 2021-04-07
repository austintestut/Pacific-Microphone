import React from 'react';

const ScriptTalkingBlock = ({ talkingBlock }) => {
  const { character, text } = talkingBlock;
  return (
    <div className="talkingBlock">
      <div className="TBcharacter">{character}</div>
      <div className="TBtext">{text}</div>
    </div>
  );
};

export default ScriptTalkingBlock;
