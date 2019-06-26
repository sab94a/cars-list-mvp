// @flow
import { takeEvery } from "@redux-saga/core/effects";
import type { Saga } from 'redux-saga';
import { API_REQUEST } from 'constants/actions';
import { apiSaga } from './api';

function* rootSaga():Saga<void> {
    yield takeEvery(API_REQUEST, apiSaga)
};

export default rootSaga;
