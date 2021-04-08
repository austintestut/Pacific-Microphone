/* eslint-disable react/prop-types */
import React from 'react';
import ScriptAnalysisDisplay from './SAComponents/ScriptAnalysisDisplay';

class ScriptAnalyzer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      watsonAnalysisObj: null,
      currTone: null
    }
    this.displayWatsonAnalysis = this.displayWatsonAnalysis.bind(this);
  }

  componentDidMount() {
    const {script} = this.props
    this.setState({watsonAnalysisObj: JSON.parse(script.watsonAnalysis)})
  }

  displayWatsonAnalysis(sentence) {
    const { watsonAnalysisObj }= this.state
    this.setState({currTone: watsonAnalysisObj[sentence][0].tone_name})
  }

  render() {
    const {script} = this.props;
    const {currTone} = this.state
    console.log(script)
    return (
      <>
      <ScriptAnalysisDisplay script={script} displayWatsonAnalysis={this.displayWatsonAnalysis}/>
      <div>{currTone}</div>
      </>
    )
  }

}

export default ScriptAnalyzer;
