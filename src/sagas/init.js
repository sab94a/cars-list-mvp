//@flow 

import { put, select } from "@redux-saga/core/effects";
import { fetchColors, fetchManufacturers, getCars } from 'actions';

export default function* initSaga({
    payload: {
        page,
        manufacturer,
        color,
        sort
    }
}) {
    const { cars, colors, manufacturers } = yield select();

    const hasCars  = !!cars.pages[cars.page]
    const hasColor = !!colors.items.length;
    const hasManufacturer  = !!manufacturers.items.length;

    if(!hasColor) {
        yield put(fetchColors())
    }

    if(!hasManufacturer) {
        yield put(fetchManufacturers())
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
