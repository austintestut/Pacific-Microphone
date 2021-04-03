/* eslint-disable react/prop-types */
import React from 'react';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { page } = this.props;
    return <div id="mainPage">{page}</div>;
  }
}

export default MainPage;
