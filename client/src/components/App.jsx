import React from 'react';
import AppHeader from './AppHeader';
import AppBody from './AppBody';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div id="App">
        <AppHeader />
        <AppBody />
      </div>
    );
  }
}

export default App;
