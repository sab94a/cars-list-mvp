// @flow

import type { Saga } from 'redux-saga';
import { put, call } from "@redux-saga/core/effects";
import { normalize } from 'normalizr';
import { ENTITIES_RESOLVE } from 'constants/actions'

import type { EntitiesAction } from 'types/store';

export default function* entitySaga({ payload: { schema, action, data } }:EntitiesAction):Saga<void> {
    const { entities, result } = yield call(normalize, data, schema);

    yield put({ type: ENTITIES_RESOLVE, payload: entities })
    yield put({ type: action, payload: result });
}
