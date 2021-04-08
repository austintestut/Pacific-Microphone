import React from 'react';
import Recorder from './Recorder';
import AudioText from './AudioText';
import VoiceAnalysisChart from './VoiceAnalysisChart';

class VoiceAnalyzer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sendDataToMainPage, audioToText, voiceAnalysisData } = this.props;
    return (
      <div className="voiceRecorderAndTextContainer">
        <div>
        <VoiceAnalysisChart voiceAnalysisData={voiceAnalysisData} />
        <AudioText audioToText={audioToText} />
        </div>
        <Recorder sendDataToMainPage={sendDataToMainPage} />
      </div>
    );
  }
}

export default VoiceAnalyzer;
