import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      user: '',
      userId: '',
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
    const { authenticated, user } = this.state;
    return (
      <div id="App">
        There be pirates!
        <br />
        {!authenticated && (
          <div>
            <button>
              <a href="/google">Log in with Google</a>
            </button>
            <br />
          </div>
        )}
        {authenticated && <div>This is where the app will be, {user}</div>}
      </div>
    );
  }
}

export default App;
