/* eslint-disable react/prop-types */
import React from 'react';
import SidePanel from './SidePanel';
import MainPage from './MainPage';
import VoiceAnalysisChart from './VoiceAnalysisChart';

class AppBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 'toneAnalyzer',
      selectedScriptIndex: null,
    };

    this.changeSelectedPage = this.changeSelectedPage.bind(this);
    this.changeSelectedScript = this.changeSelectedScript.bind(this);
  }

  changeSelectedPage(page) {
    this.setState({ selectedPage: page, selectedScriptIndex: null });
  }

  changeSelectedScript(index) {
    // Will need change this to display the script in the appropriate format on the page
    this.setState({ selectedScriptIndex: index });
  }

  render() {
    const { selectedPage, selectedScriptIndex } = this.state;
    const { scriptList } = this.props;
    return (
      <div id="appBody">
        <SidePanel
          changeSelectedPage={this.changeSelectedPage}
          changeSelectedScript={this.changeSelectedScript}
          scriptList={scriptList}
        />
        <MainPage page={selectedPage} selectedScript={scriptList[selectedScriptIndex]} />
        <VoiceAnalysisChart />
      </div>
    );
  }
}

export default AppBody;
