import React, { Component } from 'react';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend,
} from 'victory';

class VoiceAnalysisChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // hard coded
      empathScores: [
        {
          anger: 60,
          sadness: 20,
          confidence: 30,
          joy: 40,
          energy: 50,
        },
        {
          anger: 10,
          sadness: 20,
          confidence: 30,
          joy: 40,
          energy: 50,
        },
        {
          anger: 14,
          sadness: 62,
          confidence: 73,
          joy: 14,
          energy: 53,
        },
        {
          anger: 32,
          sadness: 4,
          confidence: 20,
          joy: 4,
          energy: 78,
        },
        {
          anger: 62,
          sadness: 3,
          confidence: 26,
          joy: 53,
          energy: 28,
        },
      ],
    };
  }

  render() {
    let timestamp = 0;
    const { empathScores } = this.state;
    const angerData = [];
    const sadnessData = [];
    const confidenceData = [];
    const joyData = [];
    const energyData = [];
    empathScores.map((scoreSnapshot) => {
      timestamp += 5;
      angerData.push({ x: timestamp, y: scoreSnapshot.anger });
      sadnessData.push({ x: timestamp, y: scoreSnapshot.sadness });
      confidenceData.push({ x: timestamp, y: scoreSnapshot.confidence });
      joyData.push({ x: timestamp, y: scoreSnapshot.joy });
      energyData.push({ x: timestamp, y: scoreSnapshot.energy });
    });
    return (
      <div id="VoiceAnalysisChart">
        Voice Analysis
        <VictoryChart padding={100} theme={VictoryTheme.material} width={600}>
          <VictoryLegend
            x={110}
            y={40}
            centerTitle
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: 'black' }, title: { fontSize: 15 } }}
            data={[
              { name: 'Anger', symbol: { fill: '#d10e00' } },
              { name: 'Sadness', symbol: { fill: '#0074cc' } },
              { name: 'Confidence', symbol: { fill: '#662d91' } },
              { name: 'Joy', symbol: { fill: '#75ffe1' } },
              { name: 'Energy', symbol: { fill: '#008c1e' } },
            ]}
          />
          <VictoryAxis
            dependentAxis
            orientation="left"
            label="Score"
            style={{
              tickLabels: { fontSize: 10 },
            }}
            domain={[0, 100]}
            standalone={false}
          />
          <VictoryAxis
            orientation="bottom"
            style={{
              tickLabels: { fontSize: 10 },
            }}
            tickValues={[5, 10, 15, 20]}
            label="Time in seconds"
            standalone={false}
          />
          <VictoryLine
            interpolation="natural"
            style={{
              data: { stroke: '#d10e00' },
              parent: { border: '1px solid #ccc' },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            data={angerData}
          />
          <VictoryLine
            interpolation="natural"
            style={{
              data: { stroke: '#0074cc' },
              parent: { border: '1px solid #ccc' },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            data={sadnessData}
          />
          <VictoryLine
            interpolation="natural"
            style={{
              data: { stroke: '#662d91' },
              parent: { border: '1px solid #ccc' },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            data={confidenceData}
          />
          <VictoryLine
            interpolation="natural"
            style={{
              data: { stroke: '#75ffe1' },
              parent: { border: '1px solid #ccc' },
              tickLabels: { fontSize: 5 },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            data={joyData}
          />
          <VictoryLine
            interpolation="natural"
            style={{
              data: { stroke: '#008c1e' },
              parent: { border: '1px solid #ccc' },
              tickLabels: { fontSize: 5 },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            data={energyData}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default VoiceAnalysisChart;
