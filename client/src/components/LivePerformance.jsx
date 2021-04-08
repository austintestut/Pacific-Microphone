import React from 'react';
import axios from 'axios';
import ScriptDisplay from './LPComponents/ScriptDisplay';
import LPPlayButtons from './LPComponents/LPPlayButtons';

class LivePerformance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audios: [],
      audioIndexes: [],
      pointer: -1,
    };

    this.playNext = this.playNext.bind(this);
    this.playPrevious = this.playPrevious.bind(this);
    this.repeat = this.repeat.bind(this);
    this.replayScript = this.replayScript.bind(this);
    this.getAudios = this.getAudios.bind(this);
  }

  componentDidMount() {
    // this.getAudios();
  }

  componentDidUpdate(prevProps) {
    const { script, userCharacter } = this.props;
    console.log('preprops: ', prevProps.userCharacter);
    if (prevProps.userCharacter !== userCharacter) {
      console.log('Im in!');
      console.log(script);
      this.setState({ pointer: -1 });
      this.getAudios();
    }
    if (prevProps.script !== script) {
      this.setState({ pointer: -1 });
    }
  }

  getAudios() {
    const { script, userCharacter } = this.props;
    console.log('Endpoint inputs: ', script, userCharacter);
    axios
      .get('./livePerformance', {
        params: {
          script: JSON.stringify(script),
          userCharacter,
        },
      })
      .then((result) => {
        console.log('result: ', result.data);
        const audioPaths = result.data;
        const audioIndexes = [];
        const audios = audioPaths.map((path) => {
          audioIndexes.push(path.audioIndex);
          return new Audio(path.path);
        });
        this.setState({
          audios,
          audioIndexes,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  playNext() {
    const { audios, pointer } = this.state;
    const nextPointer = pointer + 1;
    audios[nextPointer].play();
    this.setState({
      pointer: nextPointer,
    });
    var elmnt = document.getElementById('highLighted');
    elmnt.scrollIntoView();
  }

  playPrevious() {
    const { audios, pointer } = this.state;
    const previousPointer = pointer - 1;
    audios[previousPointer].play();
    this.setState({ pointer: previousPointer });
    var elmnt = document.getElementById('highLighted');
    elmnt.scrollIntoView(false);
  }

  repeat() {
    const { audios, pointer } = this.state;
    audios[pointer].play();
  }

  replayScript() {
    this.setState({ pointer: -1 });
  }

  render() {
    const { audios, pointer, audioIndexes } = this.state;
    const { script, userCharacter } = this.props;

    return (
      <div id="livePerformance">
        <ScriptDisplay script={script} currentIndex={audioIndexes[pointer]} />
        <LPPlayButtons
          audiosLength={audios.length}
          pointer={pointer}
          playNext={this.playNext}
          playPrevious={this.playPrevious}
          replayScript={this.replayScript}
          repeat={this.repeat}
        />
      </div>
    );
  }
}

export default LivePerformance;
