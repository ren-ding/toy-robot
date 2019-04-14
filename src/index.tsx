import React from 'react';
import ReactDOM from 'react-dom';
import ToyRobotPage from './components/ToyRobotPage/ToyRobotPage';
import * as serviceWorker from './serviceWorker';
import {reducer, inputCommandsConverter} from './businessdomain/robotCenter'

ReactDOM.render(<ToyRobotPage 
                  reducer={reducer}
                  inputCommandsConverter = {inputCommandsConverter}
                />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
