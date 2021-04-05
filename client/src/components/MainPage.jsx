/* eslint-disable react/prop-types */
import React from 'react';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { page, selectedScript } = this.props;
    return (
      <div id="mainPage">
        <h2>Page: {page}</h2>
        <div>Script: {selectedScript?.title || 'Please select script'}</div>
      </div>
    );
  }
}

export default MainPage;
