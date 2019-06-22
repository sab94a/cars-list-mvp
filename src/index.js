// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import routes from 'configs/routes';
import './index.scss';

const root = document.getElementById('root')

if (root != null) {
    ReactDOM.render(<App routes={ routes } />, root);
}
