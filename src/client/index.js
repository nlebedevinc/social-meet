import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './common/App';

console.log(App);

render(
  <App />,
  document.getElementById('root')
);
