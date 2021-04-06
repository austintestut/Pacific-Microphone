/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import MicRecorder from 'mic-recorder-to-mp3';
import { ReactMic } from 'react-mic';
import AudioText from './AudioText.jsx';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Recorder extends React.Component {
  constructor() {
    super();
    this.state = {
      record: false,
      pause: false,
      isBlocked: false,
      blobURL: '',
      buffer: [],
      data: null
    };

    // this.handleDataRecord = this.handleDataRecord.bind(this);
    // this.handleEndRecord = this.handleEndRecord.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true });
      }
    );
  }

  // handleEndRecord(e) {
  //   // debugger
  //   console.log(e);
  // }

  // handleDataRecord(e) {
  //   // debugger;
  //   console.log(e);
  // }

  handlePlay(e) {
    e.preventDefault();
    const { record, isBlocked } = this.state;

    if (isBlocked) {
      console.log('Permission Denied');
    } else if (record) {
      Mp3Recorder.stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const data = new FormData();
          const blobURL = URL.createObjectURL(blob);

          data.append(
            'mp3',
            new File(buffer, 'file.mp3', {
              type: blob.type,
              lastModified: Date.now(),
            })
            );
            console.log('DATA2', data)
            this.setState({ data, buffer, blob, blobURL, record: false });
            axios({
              method: 'post',
              url: '/speechAnalysisClip',
              data,
            })
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => console.error(err));
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ record: true });
        })
        .catch((err) => console.error(err));
    }
  }

  handlePause(e) {
    e.preventDefault();
    const { pause } = this.state;
    this.setState({
      pause: !pause,
    });
  }

  render() {
    const { record, blobURL } = this.state;
    // const Mp3Recorder = new MicRecorder({ bitRate: 128 });
    return (
      <>
      <div><AudioText data={this.state.data} blob={this.state.blob} buffer={this.state.buffer} blobURL={this.state.blobURL}/></div>
      <div id="mic">
        {/* <ReactMic
           record={record} // defaults -> false.  Set to true to begin recording
           pause={pause} // defaults -> false (available in React-Mic-Gold)
           visualSetting="sinewave" // defaults -> "sinewave".  Other option is "frequencyBars"
           className="recorder" // provide css class name
           onStop={this.handleEndRecord} // required - called when audio stops recording
           onData={this.handleDataRecord} // optional - called when chunk of audio data is available
           strokeColor="purple" // sinewave or frequency bar color
           backgroundColor="white" // background color
           mimeType="audio/mp3" // defaults -> "audio/webm".  Set to "audio/wav" for WAV or "audio/mp3" for MP3 audio format (available in React-Mic-Gold)
           echoCancellation // defaults -> false
           autoGainControl // defaults -> false
           noiseSuppression // defaults -> false
           channelCount={1} // defaults -> 2 (stereo).  Specify 1 for mono.
           timeSlice={4999} // defaults -> 4000 milliseconds.  The interval at which captured audio is returned to onData callback (available in React-Mic-Gold).
         /> */}
        <button
          type="submit"
          onClick={this.handlePlay}
          value={record ? 'Stop' : 'Record'}
        >
          {record ? 'Stop' : 'Record'}
        </button>
        <button type="submit" onClick={this.handlePause} value="Pause">
          Pause
        </button>
        <audio src={blobURL} controls="controls" />
      </div>
      </>
    );
  }
}

export default Recorder;
