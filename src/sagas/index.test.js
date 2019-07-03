import { takeEvery, fork } from '@redux-saga/core/effects';

import { API_REQUEST, ENTITIES, GET_CARS, GET_CAR } from 'constants/actions';

import apiSaga from './api';
import entitySaga from './entity';
import getCars from './getCars';
import getCar from './getCar';
import initSaga from './init';
import favouriteSaga from './favourite';

import RootSaga from './';

describe('Root Saga', () => {
    const saga = RootSaga();

    it('Should start Init Saga', () => {
        expect(saga.next().value).toEqual(fork(initSaga));
    });

    it('Should add API_REQUEST listenner', () => {
        expect(saga.next().value).toEqual(takeEvery(API_REQUEST, apiSaga));
    });

    it('Should add ENTITIES listenner', () => {
        expect(saga.next().value).toEqual(takeEvery(ENTITIES, entitySaga));
    });
    
    it('Should add GET_CARS listenner', () => {
        expect(saga.next().value).toEqual(takeEvery(GET_CARS, getCars));
    });
    
    it('Should add GET_CAR listenner', () => {
        expect(saga.next().value).toEqual(takeEvery(GET_CAR, getCar));
    });

    it('Should start Favourite Saga', () => {
        expect(saga.next().value).toEqual(fork(favouriteSaga));
    });
})
