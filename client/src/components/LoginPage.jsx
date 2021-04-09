import React from 'react';
import loginAnimation from '../../../public/loginAnimation.gif';

const LoginPage = () => (
  <div id="LoginPage">
    <img
      src={loginAnimation}
      alt="splash screen animation"
      id="loginPageAnimation"
    />
    <a href="/google">
      <button type="button" id="LoginButton">
        Log in with Google
      </button>
    </a>
    <br />
  </div>
);

export default LoginPage;
