import React from 'react';

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props;
    return <div id="appHeader">Welcome, {user}</div>;
  }
}

export default AppHeader;
