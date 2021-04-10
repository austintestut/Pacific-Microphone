/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';

const ScriptAnalysisDisplay = ({ script, displayWatsonAnalysis, highlightedSentence }) => {
  const { title, author, talkingBlocks } = script;

  const regex = /[\w-,;_%''""$&#@*():{}<> ]+[.?!] ?/g;

  return (
    <div className="scriptDisplay">
      <div className="title">{title}</div>
      <div className="author">By: {author}</div>
      {talkingBlocks.map((talkingBlock, idx) => {
        let arrayOfSentences = [];
        if (talkingBlock.text.includes(".") || talkingBlock.text.includes("?") || talkingBlock.text.includes("!")) {
          arrayOfSentences = talkingBlock.text.match(regex)
        } else {
          arrayOfSentences.push(talkingBlock.text);
        }
        return (
        <div key={idx}>
          <div>{talkingBlock.character}</div>
          {arrayOfSentences.map((s, idx) => (
            <span key={idx}>
<<<<<<< HEAD
              {(s) && (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <span onClick={() => displayWatsonAnalysis(s.trim())}>{s}</span>
=======
              {s && (
                <span
                  className={
                    highlightedSentence === s.trim() && 'highlightedSentence'
                  }
                  onClick={() => displayWatsonAnalysis(s.trim())}
                >
                  {s}
                </span>
>>>>>>> f75e183aa772dc712c8e45e375a85495318d1c64
              )}
            </span>
          ))}
        </div>
      );})
    }
    </div>
  );
};

export default ScriptAnalysisDisplay;
