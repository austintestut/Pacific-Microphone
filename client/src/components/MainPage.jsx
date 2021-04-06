/* eslint-disable react/prop-types */
import React from 'react';
import VoiceAnalysisChart from './VoiceAnalysisChart';
import VoiceTextComparisonChart from './VoiceTextComparisonChart';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { page, selectedScript } = this.props;
    return (
      <div id="mainPage">
        <h2>Page: {page}</h2>
        <div>Script: {selectedScript?.title || 'Please select script'}</div>
        <VoiceAnalysisChart />
        {/* <VoiceTextComparisonChart /> */}
      </div>
    );
  }
}

export default MainPage;
