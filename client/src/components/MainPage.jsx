/* eslint-disable react/prop-types */
import React from 'react';
import LivePerformance from './LivePerformance';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          text: 'hi',
        },
        {
          character: 'SAM',
          text: 'Hello I am Sam I am sam the man yeah I am Sam',
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
          text: 'Hello',
        },
        {
          character: 'SAM',
          text: 'Hi',
        },
        {
          character: 'CHANDLER',
          text: 'Hello',
        },
        {
          character: 'SAM',
          text: 'Hi',
        },
        {
          character: 'CHANDLER',
          text: 'Hello',
        },
        {
          character: 'SAM',
          text: 'Hi',
        },
      ],
    };
    const userCharacter = 'CHANDLER';

    const { page, selectedScript } = this.props;

    return (
      <div id="mainPage">
        <h2>Page: {page}</h2>

        <LivePerformance script={dummyScript} userCharacter={userCharacter} />
        <div>Script: {selectedScript?.title || 'Please select script'}</div>
      </div>
    );
  }
}

export default MainPage;
