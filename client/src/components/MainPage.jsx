/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import LivePerformance from './LivePerformance';
import VoiceAnalyzer from './VoiceAnalyzer';
import ScriptAnalyzer from './ScriptAnalyzer';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voiceAnalysisData: [],
      audioToText: '',
    };
    this.sendDataToMainPage = this.sendDataToMainPage.bind(this);
  }

  sendDataToMainPage(data, name) {
    this.setState({
      [name]: data,
    });
  }

  render() {
    const { page, selectedScript, userCharacter } = this.props;
    const { voiceAnalysisData, audioToText } = this.state;
    return (
      <div id="mainPage">
        {page === 'toneAnalyzer' ? (
          <>
            {/* {selectedScript && <ScriptAnalyzer script={selectedScript} />} */}
            {
            // !selectedScript &&
            (
              <h3 id="pleaseSelectScript">Please Select Script</h3>
            )}
          </>
        ) : page === 'voiceAnalyzer' ? (
          <>
            <VoiceAnalyzer
              sendDataToMainPage={this.sendDataToMainPage}
              audioToText={audioToText}
              voiceAnalysisData={voiceAnalysisData}
            />
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
