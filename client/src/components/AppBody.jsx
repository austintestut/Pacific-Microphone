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

  changeSelectedPage(page) {
    this.setState({ selectedPage: page });
  }

  render() {
    const { selectedPage } = this.state;
    return (
      <div id="appBody">
        <SidePanel changeSelectedPage={this.changeSelectedPage} />
        <MainPage page={selectedPage} />
      </div>
    );
  }
}

export default AppBody;
