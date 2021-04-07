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
    this.state = {};
  }

  render() {
    let timestamp = 0;
    const { voiceAnalysisData } = this.props;
    if (voiceAnalysisData[0]?.error !== 0) {
      return <div>Record to graph voice analysis data</div>;
    }
    const angerData = [{ x: 0, y: 0 }];
    const sadnessData = [{ x: 0, y: 0 }];
    const calmData = [{ x: 0, y: 0 }];
    const joyData = [{ x: 0, y: 0 }];
    const energyData = [{ x: 0, y: 0 }];
    const ticks = [5];
    voiceAnalysisData.map((scoreSnapshot) => {
      timestamp += 5;
      ticks.push(timestamp + 5);
      angerData.push({ x: timestamp, y: scoreSnapshot.anger });
      sadnessData.push({ x: timestamp, y: scoreSnapshot.sorrow });
      calmData.push({ x: timestamp, y: scoreSnapshot.calm });
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
              { name: 'Calmness', symbol: { fill: '#662d91' } },
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
            tickValues={ticks}
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
            data={calmData}
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
