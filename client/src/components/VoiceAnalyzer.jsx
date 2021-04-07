import React from 'react';
import Recorder from './Recorder';
import AudioText from './AudioText';

class VoiceAnalyzer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sendDataToMainPage, audioToText } = this.props;
    return (
      <div className="voiceRecorderAndTextContainer">
        <Recorder sendDataToMainPage={sendDataToMainPage} />
        <AudioText audioToText={audioToText} />
      </div>
    );
  }
}

export default VoiceAnalyzer;
