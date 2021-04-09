/* eslint-disable react/prop-types */
import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';

class TextAnalysisChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toneColors = {
      Anger: '#d10e00',
      Joy: '#75ffe1',
      Fear: '#ed7300',
      Sadness: '#0074cc',
      Analytical: '#29dfff',
      Confident: '#662d91',
      Tentative: '#fcba03',
    };
  }

  render() {
    const { currentSentenceTones } = this.props;
    if (currentSentenceTones?.length === 0 || currentSentenceTones === undefined) {
      return <div id="TextAnalysisChart">No analysis data</div>;
    }
    const data = currentSentenceTones.map((tone) => ({
      x: tone.tone_name,
      y: tone.score * 100,
      fill: this.toneColors[tone.tone_name],
    }));
    return (
      <div id="TextAnalysisChart">
        <VictoryChart
          padding={100}
          theme={VictoryTheme.material}
          width={400}
          domainPadding={{ x: 50 }}
        >
          <VictoryAxis
            dependentAxis
            orientation="left"
            label="Score"
            style={{
              data: {
                fill: ({ datum }) => this.toneColors[datum.x],
              },
              axisLabel: { fontSize: 15, padding: 30, fontWeight: 600 },
              tickLabels: { fontSize: 10 },
            }}
            domain={[0, 100]}
            standalone={false}
          />
          <VictoryAxis
            orientation="bottom"
            label="Tone"
            style={{
              axisLabel: { fontSize: 15, padding: 30, fontWeight: 600 },
              tickLabels: { fontSize: 10 },
            }}
            standalone={false}
          />
          <VictoryBar
            data={data}
            style={{
              data: {
                fill: ({ datum }) => this.toneColors[datum.x],
              },
            }}
            barWidth={20}
            animate={{
              duration: 1000,
              onLoad: { duration: 500 },
            }}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default TextAnalysisChart;
