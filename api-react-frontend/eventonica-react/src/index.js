import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App2 from './App2';
import App3 from './App3';
import App4 from './App4';
import App5 from './App5';


import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<App2 />, document.getElementById('oneEvent'));
ReactDOM.render(<App3 />, document.getElementById('postEvent'));
ReactDOM.render(<App4 />, document.getElementById('updateEvent'));
ReactDOM.render(<App5 />, document.getElementById('deleteEvent'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
