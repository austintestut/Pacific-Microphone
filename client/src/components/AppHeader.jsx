import React from 'react';

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props;
    return (
      <>
        <div id="appHeader">
          Welcome, {user}
          <button type="button">
            <a href="/logout">Logout</a>
          </button>
        </div>
      </>
    );
  }
}

export default AppHeader;
