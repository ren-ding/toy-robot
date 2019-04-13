import React from 'react';
import ReactDOM from 'react-dom';
import ToyRobotPage from './components/ToyRobotPage/ToyRobotPage';
import * as serviceWorker from './serviceWorker';
import {reducer} from './businessdomain/robotCenter'

ReactDOM.render(<ToyRobotPage reducer={reducer}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
