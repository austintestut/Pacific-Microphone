import React from 'react';
import GifLoader from 'react-gif-loader';
import loginAnimation from '../../../public/loginAnimation.gif';

const LoginPage = () => (
  <div id="LoginPage">
    {/* mic image to go here */}
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
