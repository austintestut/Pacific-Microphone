import React from 'react';
import { Line, Bar, defaults } from 'react-chartjs-2';

Bar.defaults = defaults;

class VoiceAnalysisChart extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    this.options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  }

  render() {
    return (
      <div>
        <Bar
          data={this.data}
          width={100}
          height={50}
          options={{}}
        />
      </div>
    );
  }
}

export default VoiceAnalysisChart;
