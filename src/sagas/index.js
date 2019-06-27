// @flow
import { takeEvery } from "@redux-saga/core/effects";
import type { Saga } from 'redux-saga';
import { API_REQUEST, ENTITIES } from 'constants/actions';
import { apiSaga } from './api';
import { entitySaga } from './entity';

function* rootSaga():Saga<void> {
    yield takeEvery(API_REQUEST, apiSaga)
    yield takeEvery(ENTITIES, entitySaga)
};

export default rootSaga;
