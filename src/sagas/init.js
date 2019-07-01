//@flow 

import { put, select, takeEvery } from "@redux-saga/core/effects";
import { fetchColors, fetchManufacturers, getCars, getCar, getFavourite } from 'actions';
import { INIT_CAR, INIT_CARS } from 'constants/actions';

import type { Saga } from 'redux-saga';
import type { InitCarsAction, InitCarAction } from 'types/store';

export function* initCarsSaga({
    payload: {
        page,
        manufacturer,
        color,
        sort
    }
}:InitCarsAction):Saga<void> {
    const { cars, colors, manufacturers, favourites } = yield select();

    const hasCars  = !!cars.pages[cars.page]
    const hasColor = !!colors.items.length;
    const hasManufacturer  = !!manufacturers.items.length;
    const hasFavourites = !!favourites.length;

    if(!hasColor) {
        yield put(fetchColors())
    }

    if(!hasManufacturer) {
        yield put(fetchManufacturers())
    }

    if(!hasFavourites) {
        yield put(getFavourite())
    }

    if(!hasCars) {
        yield put(getCars({
            page,
            sort,
            color,
            manufacturer
        }))
    }
};

export function* initCarSaga({
    payload
}:InitCarAction):Saga<void> {
    const { favourites } = yield select();

    if(!favourites.length) {
        yield put(getFavourite())
    }

    yield put(getCar(payload))
}

export default function* initSage() {
    yield takeEvery(INIT_CARS, initCarsSaga)
    yield takeEvery(INIT_CAR, initCarSaga)
}