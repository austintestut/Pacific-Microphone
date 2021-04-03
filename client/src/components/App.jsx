import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      user: '',
    };
    this.login = this.login.bind(this);
  }

  login() {
    axios
      .get('/google', {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          authenticated: true,
        }).catch((err) => {
          console.log(err);
        });
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
            <button onClick={this.login}>Log in with Google</button>
            <br />
          </div>
        )}
        {authenticated && <div>This is where the app will be, {user}</div>}
      </div>
    );
  }
}

export default App;
