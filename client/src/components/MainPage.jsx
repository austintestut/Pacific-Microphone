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
    const dummyScript = {
      title: 'Sam & Chan',
      author: 'Bobby',
      talkingBlocks: [
        {
          character: 'SAM',
          text: 'I am Sam yes I am',
        },
        {
          character: 'CHANDLER',
          text: 'Hi',
        },
        {
          character: 'SAM',
          text: 'Hello I am Sam. I am Sam the man! Yeah I am Sam',
        },
        {
          character: 'CHANDLER',
          text: 'Yes you are Sam and I am Chan',
        },
        {
          character: 'SAM',
          text: 'Yes! You are Chan and I am Sam!',
        },
        {
          character: 'CHANDLER',
          text: 'I enjoy green eggs and ham',
        },
        {
          character: 'SAM',
          text: 'Sam I am',
        },
        {
          character: 'CHANDLER',
          text: 'Do you like green eggs and ham?',
        },
        {
          character: 'SAM',
          text: 'I do like green eggs and ham! Sam I am!',
        },
        {
          character: 'CHANDLER',
          text:
            'Wonderful! Shall we head to the nearest green eggs and ham establishment?',
        },
        {
          character: 'SAM',
          text:
            'Why yes my fine fellow! That sounds like an positively delightful idea!',
        },
        {
          character: 'CHANDLER',
          text: 'Hi',
        },
        {
          character: 'SAM',
          text: 'Hello',
        },
        {
          character: 'CHANDLER',
          text: 'Hi',
        },
        {
          character: 'SAM',
          text: 'Hello',
        },
        {
          character: 'CHANDLER',
          text: 'Hi',
        },
        {
          character: 'SAM',
          text: 'Hello',
        },
      ],
    };
    const userCharacter = 'SAM';

    const { page, selectedScript, currentSentenceTones } = this.props;
    const { voiceAnalysisData, clickedSentence, audioToText} = this.state;
    return (
      <div id="mainPage">
        <h2>Page: {page}</h2>

        <div>Script: {selectedScript?.title || 'Please select script'}</div>
        {page === 'toneAnalyzer' ? (
          <>
            {selectedScript && <ScriptAnalyzer script={selectedScript}/>}
            <TextAnalysisChart currentSentenceTones={currentSentenceTones}/>
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
          <LivePerformance
            script={selectedScript}
            userCharacter={userCharacter}
          />
        ) : (
          <div>Loading Screen</div>
        )}
      </div>
    );
  }
}

export default MainPage;
