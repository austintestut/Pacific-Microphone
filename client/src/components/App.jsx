/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import AppHeader from './AppHeader';
import AppBody from './AppBody';
import Recorder from './Recorder';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      user: '',
      userId: '',
      scriptList: [],
    };
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this.login();
  }

  login() {
    axios
      .get('/user')
      .then((user) => {
        if (user.data.userName) {
          this.setState({
            authenticated: true,
            user: user.data.userName,
            userId: user.data._id,
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const { authenticated, user, scriptList, userId } = this.state;
    return (
      <div id="App">
        {!authenticated && (
          <div>
            <button type="button">
              <a href="/google">Log in with Google</a>
            </button>
            <br />
          </div>
        )}
        {authenticated && (
          <div>
            <AppHeader user={user} />
            <AppBody scriptList={scriptList} />
          </div>
        )}
        <Recorder />
      </div>
    );
  }
}

export default App;
