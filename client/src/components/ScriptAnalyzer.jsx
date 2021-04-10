/* eslint-disable react/prop-types */
import React from 'react';
import ScriptAnalysisDisplay from './SAComponents/ScriptAnalysisDisplay';
import TextAnalysisChart from './TextAnalysisChart';

class ScriptAnalyzer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      watsonAnalysisObj: null,
      currToneArray: [],
      prevScript: null,
    };
    this.displayWatsonAnalysis = this.displayWatsonAnalysis.bind(this);
  }

  componentDidMount() {
    const { script } = this.props;
    console.log(script.watsonAnalysis);
    this.setState({
      watsonAnalysisObj: JSON.parse(script.watsonAnalysis),
      prevScript: script,
    });
  }

  componentDidUpdate() {
    const { script } = this.props;
    const { prevScript } = this.state;
    if (script !== prevScript) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        watsonAnalysisObj: JSON.parse(script.watsonAnalysis),
        prevScript: script,
        currToneArray: [],
      });
    }
  }

  displayWatsonAnalysis(sentence) {
    const { watsonAnalysisObj } = this.state;
    this.setState({ currToneArray: watsonAnalysisObj[sentence] });
  }

  render() {
    const { script } = this.props;
    const { currToneArray } = this.state;
    return (
      <div id="scriptAnalyzerContainer">
        <div id="TextAnalysisChartContainer">
          <TextAnalysisChart currentSentenceTones={currToneArray} />
        </div>
        <ScriptAnalysisDisplay
          script={script}
          displayWatsonAnalysis={this.displayWatsonAnalysis}
        />
        <div className="dummyContainer" />
      </div>
    );
  }
}

export default ScriptAnalyzer;
