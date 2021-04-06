import React from 'react';
import Recorder from './Recorder';

class VoiceAnalyzer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        VoiceAnalyzer is working
        <Recorder />
      </div>
    );
  }
}

export default VoiceAnalyzer;
