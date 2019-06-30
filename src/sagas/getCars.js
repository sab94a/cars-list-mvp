//@flow

import { put, select } from "@redux-saga/core/effects";

import { setCarsFilters, clearCarsPages, setCarsPage, fetchCars } from 'actions';

import type { Saga } from 'redux-saga';
import type { GetCarsAction } from 'types/store';

export default function* getCars({ payload: {
    page = 1,
    manufacturer,
    color,
    sort
} }:GetCarsAction):Saga<void> {
    const { cars } = yield select();
    const isPageExist = cars.pages[page];
    const isFilterChanged = 
        manufacturer !== cars.manufacturer || 
        color !== cars.color || 
        sort !== cars.sort;
    const shouldFetch = !isPageExist || isFilterChanged;

    if (isFilterChanged) {
        yield put(clearCarsPages());
        yield put(setCarsFilters({
            manufacturer,
            color,
            sort
        }));
    };

    if (!shouldFetch) {
        yield put(setCarsPage(page))
    } else {
        yield put(fetchCars({ page, manufacturer, color, sort }));
    };
};