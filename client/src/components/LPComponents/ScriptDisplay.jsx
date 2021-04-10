import React from 'react';
import ScriptTalkingBlock from './ScriptTalkingBlock';

const ScriptDisplay = ({ script, currentIndex }) => {
  if (!script) {
    return <h3 id="pleaseSelectScript">Please Select Script</h3>;
  }
  const { title, author, talkingBlocks } = script;

  return (
    <div id="livePerformanceContainer">
      <div className="dummyContainer" />
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
      <div className="dummyContainer" />
    </div>
  );
};

export default ScriptDisplay;
