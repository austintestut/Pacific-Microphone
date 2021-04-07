import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';

class TextAnalysisChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watsonScores: {
        // hard coded
        categories: [
          'Anger',
          'Joy',
          'Fear',
          'Sadness',
          'Analytical',
          'Confident',
          'Tentative',
        ],
        values: {
          Anger: 3,
          Joy: 63,
          Fear: 14,
          Sadness: 36,
          Analytical: 99,
          Confident: 25,
          Tentative: 69,
        },
      },
    };
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
    const { watsonScores } = this.state;
    const data = watsonScores.categories.map((category) => ({
      x: category,
      y: watsonScores.values[category],
      fill: this.toneColors[category],
    }));
    return (
      <div id="TextAnalysisChart">
        Text Analysis
        <VictoryChart
          padding={100}
          theme={VictoryTheme.material}
          width={600}
          domainPadding={{ x: 75 }}
        >
          <VictoryAxis
            dependentAxis
            orientation="left"
            label="Score"
            style={{
              data: {
                fill: ({ datum }) => this.toneColors[datum.x],
              },
              tickLabels: { fontSize: 10 },
            }}
            domain={[0, 100]}
            standalone={false}
          />
          <VictoryAxis
            orientation="bottom"
            label="Tone"
            style={{
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
