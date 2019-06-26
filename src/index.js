// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Router, Navigation, Strings } from './config';

import App from 'containers/App';

import reducer from './reducers';
import rootSaga from './sagas';

import './global.scss';

const root = document.getElementById('root');

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(
        sagaMiddleware
    )
);

sagaMiddleware.run(rootSaga);

if (root != null) {
    ReactDOM.render(<App
        store={ store }
        routes={ Router }
        navigation={ Navigation }
        strings={ Strings }
    />, root);
}
