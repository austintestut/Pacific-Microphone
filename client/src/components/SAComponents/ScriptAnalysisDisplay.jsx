import React from 'react';

const ScriptAnalysisDisplay = ({ script, displayWatsonAnalysis }) => {
  const { title, author, talkingBlocks, watsonAnalysis } = script;

  const regex = /[\w-, ]+[.?!] ?/g;

  return (
    <div className="scriptDisplay">
      <div className="title">{title}</div>
      <div className="author">By: {author}</div>
      {talkingBlocks.map((talkingBlock) => (
        <>
          <div>{talkingBlock.character}</div>
          {talkingBlock.text.match(regex).map((s) => (
            <>
              {s && (
                <div onClick={() => displayWatsonAnalysis(s.trim())}>{s}</div>
              )}
            </>
          ))}
        </>
      ))}
    </div>
  );
};

export default ScriptAnalysisDisplay;
