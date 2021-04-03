import React from 'react';
import SidePanel from './SidePanel';
import MainPage from './MainPage';

class AppBody extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPage: 'home',
    };

    this.changeSelectedPage = this.changeSelectedPage.bind(this);
  }

  changeSelectedPage(e) {
    this.setState({ selectedPage: e.target.value });
  }

  render() {
    return (
      <div id="appBody">
        <SidePanel changeSelectedPage={this.changeSelectedPage} />
        <MainPage />
      </div>
    );
  }
}

export default AppBody;
