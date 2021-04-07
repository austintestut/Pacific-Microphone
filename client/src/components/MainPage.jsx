/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import VoiceAnalysisChart from './VoiceAnalysisChart';
import LivePerformance from './LivePerformance';
import VoiceAnalyzer from './VoiceAnalyzer';
import TextAnalysisChart from './TextAnalysisChart';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { voiceAnalysisData: [] };
    this.addDataForVoiceAnalysis = this.addDataForVoiceAnalysis.bind(this);
  }

  addDataForVoiceAnalysis(data) {
    this.setState({
      voiceAnalysisData: data,
    });
  }

  render() {
    const { page, selectedScript } = this.props;
    const { voiceAnalysisData } = this.state;
    return (
      <div id="mainPage">
        <h2>Page: {page}</h2>
        <div>Script: {selectedScript?.title || 'Please select script'}</div>
        {page === 'toneAnalyzer' ? (
          <>
            <div>Tone Analyzer</div>
            <TextAnalysisChart />
          </>
        ) : page === 'voiceAnalyzer' ? (
          <>
            <VoiceAnalyzer sendDataToMainPage={this.addDataForVoiceAnalysis} />
            <VoiceAnalysisChart voiceAnalysisData={voiceAnalysisData}/>
          </>
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
