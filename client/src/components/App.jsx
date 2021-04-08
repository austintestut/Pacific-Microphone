/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import AppHeader from './AppHeader';
import AppBody from './AppBody';
import LoginPage from './LoginPage';

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

  getScripts() {
    const { userId } = this.state;
    axios
      .get(`/scripts/${userId}`)
      .then((scripts) => {
        this.setState({
          scriptList: scripts.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  login() {
    axios
      .get('/user')
      .then((user) => {
        if (user.data.userName !== undefined) {
          this.setState(
            {
              authenticated: true,
              user: user.data.userName,
              // eslint-disable-next-line no-underscore-dangle
              userId: user.data._id,
            },
            () => {
              const { authenticated } = this.state;
              if (authenticated) {
                this.getScripts();
              }
            }
          );
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
        {!authenticated && <LoginPage />}
        {authenticated && (
          <div>
            <AppHeader user={user} />
            <AppBody scriptList={scriptList} userId={userId} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
