/* eslint-disable react/prop-types */
import React from 'react';
import micImage from '../../../public/images/Blue_Ocean_Logo_Mic_Only-02.png';
import title from '../../../public/images/pmText.png';

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
        <span id="username">{user}</span>
        <img id="appTitle" src={title} alt="Pacific Microphone" />
        <a href="/logout">
          <button id="logoutButton" type="button">
            Logout
          </button>
        </a>
      </div>
    );
  }
}

export default AppHeader;
