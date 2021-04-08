/* eslint-disable react/prop-types */
import React from 'react';
import PageList from './PageList';
import ScriptList from './ScriptList';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      changeSelectedPage,
      changeSelectedScript,
      scriptList,
      toggleModal,
      deleteScript,
      selectedScriptIndex
    } = this.props;
    return (
      <div id="sidePanel">
        <PageList changeSelectedPage={changeSelectedPage} />
        <ScriptList
          changeSelectedScript={changeSelectedScript}
          scriptList={scriptList}
          toggleModal={toggleModal}
          deleteScript={deleteScript}
          selectedScriptIndex={selectedScriptIndex}
        />
      </div>
    );
  }
}

export default SidePanel;
