import React from 'react';
import SidePanel from './SidePanel';
import MainPage from './MainPage';

class AppBody extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div id="appBody">
        <SidePanel />
        <MainPage />
      </div>
    );
  }
}

export default AppBody;
