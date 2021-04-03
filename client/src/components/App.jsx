import React from 'react';
import AppHeader from './AppHeader';
import AppBody from './AppBody';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      scriptList: [],
    };
  }

  render() {
    const { scriptList } = this.state;
    return (
      <div id="App">
        <AppHeader />
        <AppBody scriptList={scriptList} />
      </div>
    );
  }
}

export default App;
