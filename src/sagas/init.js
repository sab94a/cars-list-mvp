//@flow 

import { put, select, takeEvery, fork } from "@redux-saga/core/effects";
import { fetchColors, fetchManufacturers, getCars, getCar, getFavourite } from 'actions';
import { INIT_CAR, INIT_CARS, INIT_FAVOURITIES } from 'constants/actions';

import type { Saga } from 'redux-saga';
import type { InitFavouriteAction, InitCarsAction, InitCarAction } from 'types/store';

export function* initCarsSaga({
    payload: {
        page,
        manufacturer,
        color,
        sort
    }
}:InitCarsAction):Saga<void> {
    const { cars, favourites } = yield select();

    const hasCars  = !!cars.pages[cars.page]
    const hasFavourites = !!favourites.length;

    yield fork(initFilters)

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

export function* initFavourites({
    payload: {
        manufacturer,
        color,
        sort
    } 
}: InitFavouriteAction) {
    const { favourites } = yield select();

    const hasFavourites = !!favourites.length;

    yield fork(initFilters)

    if(!hasFavourites) {
        yield put(getFavourite({
            manufacturer,
            color,
            sort
        }))
    }
}

export function* initFilters() {
    const { colors, manufacturers } = yield select();

    const hasColor = !!colors.items.length;
    const hasManufacturer  = !!manufacturers.items.length;

    if(!hasColor) {
        yield put(fetchColors())
    }

    if(!hasManufacturer) {
        yield put(fetchManufacturers())
    }
}

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
    yield takeEvery(INIT_FAVOURITIES, initFavourites)
}
