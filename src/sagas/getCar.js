//@flow

import { put, select } from "@redux-saga/core/effects";

import { fetchCar } from 'actions';
import { GET_CAR_SUCCESS } from 'constants/actions';

import type { Saga } from 'redux-saga';
import type { GetCarAction } from 'types/store';

export default function* getCar({ payload }:GetCarAction):Saga<void> {
    const { entities } = yield select();
    const isCarExist = entities && entities.cars && entities.cars[payload];
    
    if (isCarExist) {
        yield put({
            type: GET_CAR_SUCCESS,
            payload: +payload
        })
    } else {
        yield put(fetchCar(payload));
    };
};