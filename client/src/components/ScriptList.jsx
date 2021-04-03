/* eslint-disable react/prop-types */
import React from 'react';

class ScriptList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { scriptList, changeSelectedScript } = this.props;
    return (
      <div id="scriptList">
        {scriptList.map((s, idx) => (
          <button type="button" onClick={() => changeSelectedScript(idx)}>
            {s}
          </button>
        ))}
      </div>
    );
  }
}

export default ScriptList;
