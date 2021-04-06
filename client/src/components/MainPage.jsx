/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import LivePerformance from './LivePerformance';
import VoiceAnalyzer from './VoiceAnalyzer';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addDataForVoiceAnalysis = this.addDataForVoiceAnalysis.bind(this);
  }

  addDataForVoiceAnalysis(data) {
    this.setState({
      voiceAnalysisData: data,
    });
  }

  render() {
    const { page, selectedScript } = this.props;
    return (
      <div id="mainPage">
        <h2>Page: {page}</h2>
        <div>Script: {selectedScript?.title || 'Please select script'}</div>
        {page === 'toneAnalyzer' ? (
          <div>Tone Analyzer</div>
        ) : page === 'voiceAnalyzer' ? (
          <VoiceAnalyzer sendDataToMainPage={this.addDataForVoiceAnalysis} />
        ) : page === 'livePractice' ? (
          <LivePerformance />
        ) : (
          <div>Loading Screen</div>
        )}
      </div>
    );
  }
}

export default MainPage;
