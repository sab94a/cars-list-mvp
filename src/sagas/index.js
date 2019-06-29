// @flow
import { takeEvery } from "@redux-saga/core/effects";
import type { Saga } from 'redux-saga';
import { API_REQUEST, ENTITIES, GET_CARS } from 'constants/actions';
import apiSaga from './api';
import entitySaga from './entity';
import getCars from './getCars';

function* rootSaga():Saga<void> {
    yield takeEvery(API_REQUEST, apiSaga);
    yield takeEvery(ENTITIES, entitySaga);
    yield takeEvery(GET_CARS, getCars);
};

export default rootSaga;
