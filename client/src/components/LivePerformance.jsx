import React from 'react';
import axios from 'axios';
import ScriptDisplay from './ScriptDisplay';
import LPPlayButtons from './LPComponents/LPPlayButtons';

class LivePerformance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audios: [],
      pointer: 0,
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
        const audios = audioPaths.map((path) => new Audio(path));
        this.setState({
          audios,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  playNext() {
    const { audios, pointer } = this.state;
    audios[pointer].play();
    this.setState({
      pointer: pointer + 1,
    });
  }

  playPrevious() {
    const { audios, pointer } = this.state;
    const previousPointer = pointer - 1;
    audios[previousPointer].play();
    this.setState({ pointer: previousPointer });
  }

  render() {
    const { audios, pointer } = this.state;
    const { script } = this.props;

    return (
      <div className="livePerformanceContainer">
        <ScriptDisplay script={script} />
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
