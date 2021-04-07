import React from 'react';
import axios from 'axios';
import ScriptDisplay from './ScriptDisplay';
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
    this.getAudios = this.getAudios.bind(this);
  }

  componentDidMount() {
    this.getAudios();
  }

  getAudios() {
    const { script, userCharacter } = this.props;
    axios
      .get('./livePerformance', {
        params: {
          script: JSON.stringify(script),
          userCharacter,
        },
      })
      .then((result) => {
        const audioPaths = result.data;
        // create index array ['audio0.wav']
        // audio.Paths.map()
        // [0,2,4,6,8,10]
        // ['audio0','audio2','audio4'...]
        // [{path: 'audio0.wav', index: 0}]
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

  render() {
    const { audios, pointer, audioIndexes } = this.state;
    const { script } = this.props;
    return (
      <div className="livePerformanceContainer">
        <ScriptDisplay script={script} currentIndex={audioIndexes[pointer]} />
        <LPPlayButtons
          audiosLength={audios.length}
          pointer={pointer}
          playNext={this.playNext}
          playPrevious={this.playPrevious}
        />
      </div>
    );
  }
}

export default LivePerformance;
