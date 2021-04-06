import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';

class TextAnalysisChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watsonScores: {
        // hard coded
        categories: ['Joy', 'Fear'],
        values: {
          Joy: 63,
          Fear: 14,

        },
      },
    };
  }

  render() {
    const { watsonScores } = this.state;
    const data = watsonScores.categories.map((category) => {
      return { x: category, y: watsonScores.values[category] };
    });
    return (
      <div id="TextAnalysisChart">
        Text Analysis
        <VictoryChart
          padding={100}
          theme={VictoryTheme.material}
          width={600}
          domainPadding={{ x: 250 }}
        >
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
            label="Tone"
            style={{
              tickLabels: { fontSize: 10 },
            }}
            standalone={false}
          />
          <VictoryBar data={data} />
        </VictoryChart>
      </div>
    );
  }
}

export default TextAnalysisChart;
