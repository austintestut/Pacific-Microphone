/* eslint-disable react/prop-types */
import React from 'react';

class PageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { changeSelectedPage } = this.props;
    return (
      <div id="pageList">
        <button
          type="button"
          className="pageOption"
          onClick={() => changeSelectedPage('toneAnalyzer')}
        >
          <i className="" />
          <h3>Script Analyzer</h3>
        </button>
        <button
          type="button"
          className="pageOption"
          onClick={() => changeSelectedPage('voiceAnalyzer')}
        >
          <i className="" />
          <h3>Voice Analyzer</h3>
        </button>
        <button
          type="button"
          className="pageOption"
          onClick={() => changeSelectedPage('livePractice')}
        >
          <i className="" />
          <h3>Live Practice</h3>
        </button>
      </div>
    );
  }
}

export default PageList;
