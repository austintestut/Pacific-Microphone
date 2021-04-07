import React from 'react';
import ScriptTalkingBlock from './ScriptTalkingBlock';

const ScriptDisplay = ({ script, currentIndex }) => {
  const { title, author, talkingBlocks } = script;
  return (
    <div className="scriptDisplay">
      <div className="title">{title}</div>
      <div className="author">By: {author}</div>
      {talkingBlocks.map((talkingBlock, i) => {
        let identifier;
        if (i === currentIndex) {
          identifier = true;
        }
        return (
          <ScriptTalkingBlock
            talkingBlock={talkingBlock}
            identifier={identifier}
          />
        );
      })}
    </div>
  );
};

// array[pointer] = current index

export default ScriptDisplay;
