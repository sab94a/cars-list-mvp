//@flow

import { put, select } from "@redux-saga/core/effects";
import { 
    API_REQUEST,
    ENTITIES,    
    GET_CARS_REUQUEST,
    GET_CARS_SUCCESS,
    GET_CARS_ERROR
} from 'constants/actions';

import { setCarsFilters, clearCarsPages, setCarsPage } from 'actions';

import { API_CARS } from 'constants/api';
import { Car } from '../entities';

import type { Saga } from 'redux-saga';
import type { CarsRequestParams, CarsResponse } from 'types/api';
import type { EntitiesPayload, GetCarsAction } from 'types/store';

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
        yield put(setCarsPage(1));
        yield put(setCarsFilters({
            manufacturer,
            color,
            sort
        }));
    };

    if (!shouldFetch) {
        yield put(setCarsPage(page))
    } else {
        yield put({
            endpoint: API_CARS,
            type: API_REQUEST,
            types: [GET_CARS_REUQUEST, ENTITIES, GET_CARS_ERROR],
            query: {
                page, 
                manufacturer, 
                color, 
                sort
            },
            onSuccess: ({ cars, totalPageCount, totalCarsCount }: CarsResponse):EntitiesPayload => ({
                schema: { items: [Car] },
                action: GET_CARS_SUCCESS,
                data: {
                    items: cars,
                    page,
                    totalPages: totalPageCount,
                    totalItems: totalCarsCount
                }
            })
        });
    };
};