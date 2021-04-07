import React from 'react';
import Recorder from './Recorder';

class VoiceAnalyzer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sendDataToMainPage, audioToText } = this.props;
    return (
      <div>
        VoiceAnalyzer is working
        <Recorder sendDataToMainPage={sendDataToMainPage} audioToText={audioToText}/>
      </div>
    );
  }
}

export default VoiceAnalyzer;
