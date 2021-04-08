/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import VoiceAnalysisChart from './VoiceAnalysisChart';
import LivePerformance from './LivePerformance';
import VoiceAnalyzer from './VoiceAnalyzer';
import TextAnalysisChart from './TextAnalysisChart';
import ScriptAnalyzer from './ScriptAnalyzer';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voiceAnalysisData: [],
      audioToText: '',
      clickedSentence: '',
    };
    this.sendDataToMainPage = this.sendDataToMainPage.bind(this);
  }

  sendDataToMainPage(data, name) {
    this.setState({
      [name]: data,
    });
  }

  render() {
    const userCharacter = null;

    const { page, selectedScript, currentSentenceTones } = this.props;
    const { voiceAnalysisData, clickedSentence, audioToText } = this.state;
    return (
      <div id="mainPage">
        <h2>Page: {page}</h2>

        <div>Script: {selectedScript?.title || 'Please select script'}</div>
        {page === 'toneAnalyzer' ? (
          <>
            {selectedScript && <ScriptAnalyzer script={selectedScript} />}
            <TextAnalysisChart currentSentenceTones={currentSentenceTones} />
          </>
        ) : page === 'voiceAnalyzer' ? (
          <>
            <VoiceAnalyzer
              sendDataToMainPage={this.sendDataToMainPage}
              audioToText={audioToText}
            />
            <VoiceAnalysisChart voiceAnalysisData={voiceAnalysisData} />
          </>
        ) : page === 'livePractice' ? (
          // if userCharacter does not exist yet,  than pass null as script
          userCharacter === null ? (
            <LivePerformance script={null} userCharacter={null} />
          ) : (
            <LivePerformance
              script={selectedScript}
              userCharacter={userCharacter}
            />
          )
        ) : (
          <div>Loading Screen</div>
        )}
      </div>
    );
  }
}

export default MainPage;
