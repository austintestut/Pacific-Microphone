import React from 'react';
import PageList from './PageList';
import ScriptList from './ScriptList';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="sidePanel">
        <PageList />
        <ScriptList />
      </div>
    );
  }
}

export default SidePanel;
