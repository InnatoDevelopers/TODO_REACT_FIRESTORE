import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {FIREBASE_CONFIG} from './properties/properties';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'materialize-css/dist/css/materialize.min.css';

firebase.initializeApp(FIREBASE_CONFIG);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
