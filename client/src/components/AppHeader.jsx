/* eslint-disable react/prop-types */
import React from 'react';
import micImage from '../../../public/images/project_microphone_logo.png';

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props;
    return (
      <div id="appHeader">
        <img id="headerLogo" src={micImage} alt="logo" />
        Welcome, {user}
        <button type="button">
          <a href="/logout">Logout</a>
        </button>
      </div>
    );
  }
}

export default AppHeader;
