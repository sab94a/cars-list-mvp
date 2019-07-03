// @flow

import { takeEvery, fork } from "@redux-saga/core/effects";
import type { Saga } from 'redux-saga';
import { API_REQUEST, ENTITIES, GET_CARS, GET_CAR } from 'constants/actions';
import apiSaga from './api';
import entitySaga from './entity';
import getCars from './getCars';
import getCar from './getCar';
import initSaga from './init';
import favouriteSaga from './favourite';

function* rootSaga():Saga<void> {
    yield fork(initSaga);
    yield takeEvery(API_REQUEST, apiSaga);
    yield takeEvery(ENTITIES, entitySaga);
    yield takeEvery(GET_CARS, getCars);
    yield takeEvery(GET_CAR, getCar);
    yield fork(favouriteSaga);
};

export default rootSaga;
