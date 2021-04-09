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
          <div className="pageTitle">Script Analyzer</div>
        </button>
        <button
          type="button"
          className="pageOption"
          onClick={() => changeSelectedPage('voiceAnalyzer')}
        >
          <i className="" />
          <div className="pageTitle">Voice Analyzer</div>
        </button>
        <button
          type="button"
          className="pageOption"
          onClick={() => changeSelectedPage('livePractice')}
        >
          <i className="" />
          <div className="pageTitle">Live Practice</div>
        </button>
      </div>
    );
  }
}

export default PageList;
