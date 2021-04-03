/* eslint-disable react/prop-types */
import React from 'react';
import SidePanel from './SidePanel';
import MainPage from './MainPage';

class AppBody extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPage: 'home',
      selectedScript: null,
    };

    this.changeSelectedPage = this.changeSelectedPage.bind(this);
    this.changeSelectedScript = this.changeSelectedScript.bind(this);
  }

  changeSelectedPage(page) {
    this.setState({ selectedPage: page, selectedScript: null });
  }

  changeSelectedScript(index) {
    const { scriptList } = this.props;
    this.setState({ selectedScript: scriptList[index] });
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
