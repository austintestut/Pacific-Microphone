import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

class VoiceAnalysisChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empathScores: {
        5: {
          Anger: 60,
          Sadness: 20,
          Confidence: 30,
          Joy: 40,
          Energy: 50,
        },
        10: {
          Anger: 10,
          Sadness: 20,
          Confidence: 30,
          Joy: 40,
          Energy: 50,
        },
      },
    };
  }

  render() {
    return (
      <VictoryChart height={200} width={400}>
        <VictoryAxis
          dependentAxis
          orientation="left"
          label="Score"
          style={{
            tickLabels: { fontSize: 5 },
            labels: { fontSize: 12 },
          }}
          domain={[0, 100]}
          standalone={false}
        />
        <VictoryAxis
          orientation="bottom"
          style={{
            tickLabels: { fontSize: 5 },
          }}
          label="Time in seconds"
          standalone={false}
        />
        <VictoryLine
          interpolation="natural"
          style={{
            data: { stroke: '#662d91' },
            parent: { border: '1px solid #ccc' },
            tickLabels: { fontSize: 5 },
          }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          data={[
            // conditionally rendered depending on length of clip
            { x: 5, y: this.state.empathScores[5].Anger },
            { x: 10, y: this.state.empathScores[10].Anger },
            { x: 15, y: 80 },
            { x: 20, y: 70 },
            { x: 25, y: 90 },
            { x: 30, y: 90 },
            { x: 35, y: 90 },
            { x: 40, y: 90 },
          ]}
        />
      </VictoryChart>
    );
  }
}

export default VoiceAnalysisChart;
