// @flow

import {
    INIT,
    GET_CARS, 
    GET_CARS_REUQUEST,
    GET_CARS_SUCCESS,
    GET_CARS_ERROR,
    GET_COLORS_REQUEST,
    GET_COLORS_SUCCESS,
    GET_COLORS_ERROR,
    GET_MANUFACTURERS_REQUEST,
    GET_MANUFACTURERS_SUCCESS,
    GET_MANUFACTURERS_ERROR,
    CLEAR_CARS_PAGES, 
    SET_CARS_FILTER, 
    SET_CARS_PAGE,
    ENTITIES,
    API_REQUEST
} from 'constants/actions';

import { API_CARS, API_COLORS, API_MANUFACTURERS } from 'constants/api';

import { Car } from '../entities';

import type { 
    CarsRequestParams, 
    CarsFilters, 
    CarsResponse,
    ApiRequestAction
} from 'types/api';

import type { 
    InitAction,
    GetCarsAction, 
    SetCarsFilterAction, 
    SetCarsPageAction, 
    ClearCarsPagesAction,
    EntitiesPayload
} from 'types/store';


export const getCars = (payload: CarsRequestParams):GetCarsAction => ({
    type: GET_CARS,
    payload
});

export const setCarsFilters = (filters: CarsFilters = {}): SetCarsFilterAction => ({
    type: SET_CARS_FILTER,
    payload: filters
});

export const setCarsPage = (page: number = 1):SetCarsPageAction => ({
    type: SET_CARS_PAGE,
    payload: page
});

export const clearCarsPages = ():ClearCarsPagesAction => ({
    type: CLEAR_CARS_PAGES
});

export const fetchCars = ({
    page,
    manufacturer,
    color,
    sort
}:CarsRequestParams):ApiRequestAction => ({
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

export const init = (params: CarsRequestParams):InitAction => ({
    type: INIT,
    payload: params
})

export const fetchColors = ():ApiRequestAction => ({
    endpoint: API_COLORS,
    type: API_REQUEST,
    types: [GET_COLORS_REQUEST, GET_COLORS_SUCCESS, GET_COLORS_ERROR],
    onSuccess: ({ colors }) => colors
});

export const fetchManufacturers = ():ApiRequestAction => ({
    endpoint: API_MANUFACTURERS,
    type: API_REQUEST,
    types: [GET_MANUFACTURERS_REQUEST, GET_MANUFACTURERS_SUCCESS, GET_MANUFACTURERS_ERROR],
    onSuccess: ({ manufacturers }) => manufacturers
});
