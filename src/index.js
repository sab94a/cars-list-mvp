// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import Config from './config';
import './global.scss';

const root = document.getElementById('root')

if (root != null) {
    ReactDOM.render(<App
        routes={ Config.Router }
        navigation={ Config.Navigation }
        strings={ Config.Strings }
    />, root);
}
