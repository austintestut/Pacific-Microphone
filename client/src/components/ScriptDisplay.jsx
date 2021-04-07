import React from 'react';
import ScriptTalkingBlock from './ScriptTalkingBlock';

const ScriptDisplay = ({ script }) => {
  const { title, author, talkingBlocks } = script;
  return (
    <div className="scriptDisplay">
      <div className="title">{title}</div>
      <div className="author">By: {author}</div>
      {talkingBlocks.map((talkingBlock) => (
        <ScriptTalkingBlock talkingBlock={talkingBlock} />
      ))}
    </div>
  );
};

export default ScriptDisplay;
