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
        <AppBody scriptList={['test', 'australia', 'hack reactor']} />
      </div>
    );
  }
}

export default App;
