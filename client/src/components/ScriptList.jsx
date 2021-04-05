/* eslint-disable react/prop-types */
import React from 'react';

class ScriptList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { scriptList, changeSelectedScript, toggleModal } = this.props;
    return (
      <div id="scriptList">
        {scriptList.map((s) => (
          <button
            type="button"
            key={s.title}
            onClick={() => changeSelectedScript(scriptList.indexOf(s))}
          >
            {s.title}
          </button>
        ))}
        <button id="newScriptButton" type="button" onClick={toggleModal}>
          + Add New Script
        </button>
      </div>
    );
  }
}

export default ScriptList;
