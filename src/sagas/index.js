// @flow
import { takeEvery } from "@redux-saga/core/effects";
import type { Saga } from 'redux-saga';
import { API_REQUEST, ENTITIES, GET_CARS, GET_CAR, INIT } from 'constants/actions';
import apiSaga from './api';
import entitySaga from './entity';
import getCars from './getCars';
import getCar from './getCar';
import initSaga from './init';

function* rootSaga():Saga<void> {
    yield takeEvery(INIT, initSaga);
    yield takeEvery(API_REQUEST, apiSaga);
    yield takeEvery(ENTITIES, entitySaga);
    yield takeEvery(GET_CARS, getCars);
    yield takeEvery(GET_CAR, getCar);
};

export default rootSaga;
