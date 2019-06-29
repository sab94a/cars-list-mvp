import { takeEvery } from '@redux-saga/core/effects';
import { API_REQUEST, ENTITIES } from 'constants/actions';
import { apiSaga } from './api';
import entitySaga from './entity';
import RootSaga from './';

describe('root Saga', () => {
    const saga = RootSaga();

    it('Should add API_REQUEST listenner', () => {
        expect(saga.next().value).toEqual(takeEvery(API_REQUEST, apiSaga))
    });

    it('Should add ENTITIES listenner', () => {
        expect(saga.next().value).toEqual(takeEvery(ENTITIES, entitySaga))
    });
})
