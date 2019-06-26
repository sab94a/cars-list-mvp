// @flow

import qs from 'query-string';
import { put, call } from "@redux-saga/core/effects";
import type { Saga } from 'redux-saga';
import type { ApiRequest, ApiRequestParams } from 'types/store';

export const makeRequest = ({
    endpoint,
    method,
    query,
    onSuccess
}:ApiRequestParams) => {
    if (query) {
        endpoint += `?${ qs.stringify(query) }`;
    }
    return fetch(endpoint, {
        method
    })
    .then(res => res.json())
};

export function* apiSaga({
    endpoint,
    method = 'GET',
    query,
    types,
    onSuccess,
    onError
}:ApiRequest ):Saga<void> {
    const [ REQUEST_ACTION, SUCCESS_ACTION, ERROR_ACTION ] = types;

    yield put({ type: REQUEST_ACTION });

    try {
        let payload = yield call(makeRequest, {
            endpoint,
            method,
            query,
            onSuccess,
        });

        if (typeof onSuccess === 'function') {
            payload = onSuccess(payload)
        };

        yield put({ type: SUCCESS_ACTION, payload })
    } catch(e) {
        let payload = e.message;

        if (typeof onError === 'function') {
            payload = onError(e)
        };

        yield put({ type: ERROR_ACTION, payload })
    }
};
