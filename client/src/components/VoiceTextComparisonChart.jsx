import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryBar } from 'victory';

const VoiceTextComparisonChart = () => {
  return (
    <VictoryChart height={250} width={400}>
      <VictoryBar
        style={{
          labels: { fontSize: 12 },
        }}
        categories={{
          x: ['Anger', 'Sadness', 'Confidence', 'Joy'],
        }}
      />
    </VictoryChart>
  );
};

export default VoiceTextComparisonChart;
