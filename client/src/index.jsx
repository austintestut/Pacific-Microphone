/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import App from './components/App';

Modal.setAppElement('#app');

ReactDOM.render(<App />, document.getElementById('app'));
