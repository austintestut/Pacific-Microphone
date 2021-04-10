/* eslint-disable react/prop-types */
import React from 'react';

class ScriptList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      scriptList,
      changeSelectedScript,
      toggleModal,
      deleteScript,
      selectedScriptIndex,
    } = this.props;
    return (
      <div id="scriptList">
        <button id="newScriptButton" type="button" onClick={toggleModal}>
          + Add New Script
        </button>
        {scriptList.map((s, idx) => (
          <button
            type="button"
            key={idx}
            className={`${
              selectedScriptIndex === idx
                ? 'selectedScript'
                : 'newScriptinSidePanel'
            }`}
            onClick={() => changeSelectedScript(scriptList.indexOf(s))}
          >
            {s.title}
          </button>
        ))}
        {selectedScriptIndex !== null && (
          <button id="deleteScriptButton" type="button" onClick={deleteScript}>
            Delete Selected Script
          </button>
        )}
      </div>
    );
  }
}

export default ScriptList;
