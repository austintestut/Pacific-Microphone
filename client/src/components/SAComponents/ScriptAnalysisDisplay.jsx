import React from 'react';

const ScriptAnalysisDisplay = ({ script, displayWatsonAnalysis, highlightedSentence }) => {
  const { title, author, talkingBlocks } = script;

  const regex = /[\w-,;_%''""$&#@*() ]+[.?!] ?/g;

  return (
    <div className="scriptDisplay">
      <div className="title">{title}</div>
      <div className="author">By: {author}</div>
      {talkingBlocks.map((talkingBlock, idx) => (
        <div key={idx}>
          <div>{talkingBlock.character}</div>
          {talkingBlock.text.match(regex).map((s, idx) => (
            <span key={idx}>
              {s && (
                <span
                  className={
                    highlightedSentence === s.trim() && 'highlightedSentence'
                  }
                  onClick={() => displayWatsonAnalysis(s.trim())}
                >
                  {s}
                </span>
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ScriptAnalysisDisplay;
