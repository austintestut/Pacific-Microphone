/* eslint-disable react/prop-types */
import React from 'react';
import SidePanel from './SidePanel';
import MainPage from './MainPage';

class AppBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 'scriptAnalyzer',
      selectedScript: null,
    };

    this.changeSelectedPage = this.changeSelectedPage.bind(this);
    this.changeSelectedScript = this.changeSelectedScript.bind(this);
  }

  changeSelectedPage(page) {
    this.setState({ selectedPage: page, selectedScript: null });
  }

  changeSelectedScript(script) {
    const { scriptList } = this.props;
    this.setState({ selectedScript: script.title });
  }

  render() {
    const { selectedPage, selectedScript } = this.state;
    const { scriptList } = this.props;
    return (
      <div id="appBody">
        <SidePanel
          changeSelectedPage={this.changeSelectedPage}
          changeSelectedScript={this.changeSelectedScript}
          scriptList={scriptList}
        />
        <MainPage page={selectedPage} selectedScript={selectedScript} />
      </div>
    );
  }
}

export default AppBody;
