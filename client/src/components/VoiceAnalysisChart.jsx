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
        15: {
          Anger: 14,
          Sadness: 62,
          Confidence: 73,
          Joy: 14,
          Energy: 53,
        },
        20: {
          Anger: 32,
          Sadness: 4,
          Confidence: 20,
          Joy: 4,
          Energy: 78,
        },
        25: {
          Anger: 62,
          Sadness: 3,
          Confidence: 26,
          Joy: 53,
          Energy: 28,
        },
      },
    };
  }

  render() {
    const { empathScores } = this.state;
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
            data={[
              // conditionally rendered depending on length of clip
              { x: 5, y: empathScores[5].Anger },
              { x: 10, y: empathScores[10].Anger },
              { x: 15, y: empathScores[15].Anger },
              { x: 20, y: empathScores[20].Anger },
              { x: 25, y: empathScores[25].Anger },
            ]}
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
            data={[
              // conditionally rendered depending on length of clip
              { x: 5, y: empathScores[5].Sadness },
              { x: 10, y: empathScores[10].Sadness },
              { x: 15, y: empathScores[15].Sadness },
              { x: 20, y: empathScores[20].Sadness },
              { x: 25, y: empathScores[25].Sadness },
            ]}
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
            data={[
              // conditionally rendered depending on length of clip
              { x: 5, y: empathScores[5].Confidence },
              { x: 10, y: empathScores[10].Confidence },
              { x: 15, y: empathScores[15].Confidence },
              { x: 20, y: empathScores[20].Confidence },
              { x: 25, y: empathScores[25].Confidence },
            ]}
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
            data={[
              // conditionally rendered depending on length of clip
              { x: 5, y: empathScores[5].Joy },
              { x: 10, y: empathScores[10].Joy },
              { x: 15, y: empathScores[15].Joy },
              { x: 20, y: empathScores[20].Joy },
              { x: 25, y: empathScores[25].Joy },
            ]}
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
            data={[
              // conditionally rendered depending on length of clip
              { x: 5, y: empathScores[5].Energy },
              { x: 10, y: empathScores[10].Energy },
              { x: 15, y: empathScores[15].Energy },
              { x: 20, y: empathScores[20].Energy },
              { x: 25, y: empathScores[25].Energy },
            ]}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default VoiceAnalysisChart;
