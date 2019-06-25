// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from 'containers/App';
import Config from './config';
import reducer from './reducers';
import './global.scss';

const root = document.getElementById('root');

const store = createStore(
    reducer
);

if (root != null) {
    ReactDOM.render(<App
        store={ store }
        routes={ Config.Router }
        navigation={ Config.Navigation }
        strings={ Config.Strings }
    />, root);
}
