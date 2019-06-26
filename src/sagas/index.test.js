import { takeEvery } from '@redux-saga/core/effects';
import { API_REQUEST } from 'constants/actions';
import { apiSaga } from './api';
import RootSaga from './';

describe('root Saga', () => {
    const saga = RootSaga();

    it('Should add API_REQUEST listenner', () => {
        expect(saga.next().value).toEqual(takeEvery(API_REQUEST, apiSaga))
    });
})
