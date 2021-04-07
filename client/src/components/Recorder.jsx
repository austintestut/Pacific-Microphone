/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import MicRecorder from 'mic-recorder-to-mp3';
import { ReactMic } from 'react-mic';
import AudioText from './AudioText.jsx';

const Mp3Recorder = new MicRecorder({ bitRate: 128, sampleRate: 11025 });

class Recorder extends React.Component {
  constructor() {
    super();
    this.state = {
      record: false,
      isBlocked: false,
    blobURL: '',
      sent: 0,
      recieved: [],
    };

    this.handleEndRecord = this.handleEndRecord.bind(this);
    this.handleEndRecordFull = this.handleEndRecordFull.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.checkPerms = this.checkPerms.bind(this);
    this.handleStartRecord = this.handleStartRecord.bind(this);
    this.handleSendSegment = this.handleSendSegment.bind(this);
    this.sendDataToRecorder = this.sendDataToRecorder.bind(this);
  }

  componentDidMount() {
    this.checkPerms();
  }

  handlePlay(e) {
    e.preventDefault();
    const { record, isBlocked } = this.state;

    if (isBlocked) {
      console.log('Permission Denied');
      this.checkPerms();
    } else if (record) {
      this.setState({
        record: false,
      });
    } else {
      this.handleStartRecord();
    }
  }

  handleStartRecord() {
    Mp3Recorder.start()
      .then(() => {
        this.setState({ record: true });
        setTimeout(this.handleSendSegment, 4900);
      })
      .catch((err) => console.error(err));
  }

  handleSendSegment() {
    const { sent, recieved, record } = this.state;
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const data = new FormData();
        const blobURL = URL.createObjectURL(blob);

        this.setState({ sent: sent + 1, buffer });
        data.append(
          'mp3',
          new File(buffer, 'file.mp3', {
            type: blob.type,
            lastModified: Date.now(),
          })
        );
        axios({
          method: 'post',
          url: '/speechAnalysisClip',
          data,
        })
          .then((response) => {
            console.log(response);
            recieved.push(response.data);
            this.setState(
              {
                recieved: recieved,
                buffer,
              },
              this.handleEndRecord
            );
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.error(err));
    if (record) {
      this.handleStartRecord();
    }
  }

  handleEndRecord() {
    const { sent, record, recieved } = this.state;
    const { sendDataToMainPage } = this.props;
    if (sent === recieved.length && record === false) {
      setTimeout((() => {
        if(sent === this.state.sent) {
          sendDataToMainPage(recieved, 'voiceAnalysisData');
          this.setState({
            sent: 0,
            recieved: [],
          });
        }
      }).bind(this), 5000)
    }
  }

  handleEndRecordFull(data,) {
    this.setState({
      blobURL: data.blobURL,
      fullBlob: data,
    });
  }

  checkPerms() {
    navigator.getUserMedia(
      { audio: { sampleRate: 11025 } },
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

  sendDataToRecorder(data, name) {
    this.setState({
      [name]: data,
    });
  }

  render() {
    const { record, blobURL, fullBlob } = this.state;
    const { sendDataToMainPage, audioToText } = this.props;
    // const Mp3Recorder = new MicRecorder({ bitRate: 128 });
    return (
      <>
      <AudioText blobURL={blobURL} fullBlob={fullBlob} sendDataToRecorder={this.sendDataToRecorder} sendDataToMainPage={sendDataToMainPage} audioToText={audioToText}/>
      <div id="mic">
        <ReactMic
          record={record} // defaults -> false.  Set to true to begin recording
          pause={false} // defaults -> false (available in React-Mic-Gold)
          visualSetting="frequencyBars" // defaults -> "sinewave".  Other option is "frequencyBars"
          className="recorder" // provide css class name
          onStop={this.handleEndRecordFull} // required - called when audio stops recording
          strokeColor="purple" // sinewave or frequency bar color
          backgroundColor="white" // background color
          mimeType="audio/mp3" // defaults -> "audio/webm".  Set to "audio/wav" for WAV or "audio/mp3" for MP3 audio format (available in React-Mic-Gold)
          echoCancellation // defaults -> false
          autoGainControl // defaults -> false
          noiseSuppression // defaults -> false
          channelCount={1} // defaults -> 2 (stereo).  Specify 1 for mono.
          timeSlice={4999} // defaults -> 4000 milliseconds.  The interval at which captured audio is returned to onData callback (available in React-Mic-Gold).
        />
        <button
          type="submit"
          onClick={this.handlePlay}
          value={record ? 'Stop' : 'Record'}
        >
          {record ? 'Stop' : 'Record'}
        </button>
        <audio src={blobURL} controls="controls" />
      </div>
      </>
    );
  }
}

export default Recorder;
