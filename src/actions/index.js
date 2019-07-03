// @flow

import {
    INIT_CAR,
    INIT_CARS,
    INIT_FAVOURITIES,
    GET_CARS, 
    GET_CARS_REQUEST,
    GET_CARS_SUCCESS,
    GET_CARS_ERROR,
    GET_CAR,
    GET_CAR_REQUEST,
    GET_CAR_SUCCESS,
    GET_CAR_ERROR,
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
    API_REQUEST,
    GET_FAVOURITE,
    ADD_FAVOURITE,
    REMOVE_FAVOURITE,
    UPDATE_FAVOURITE
} from 'constants/actions';

import { API_CARS, API_COLORS, API_MANUFACTURERS } from 'constants/api';

import { Car } from '../entities';

import type { 
    CarsRequestParams, 
    CarsFilters, 
    CarsResponse,
    CarResponse,
    ColorsResponse,
    ManufacturersResponse,
    ApiRequestAction
} from 'types/api';

import type {
    InitCarAction,
    InitCarsAction,
    InitFavouriteAction,
    GetCarAction,
    GetCarsAction, 
    SetCarsFiltersAction, 
    SetCarsPageAction, 
    ClearCarsPagesAction,
    EntitiesPayload,
    GetFavouriteAction,
    RemoveFavouriteAction,
    AddFavouriteAction,
    UpdateFavouriteAction,
    UpdateFavouritePayload
} from 'types/store';

export const initCar = (id: number):InitCarAction => ({
    type: INIT_CAR,
    payload: id
});

export const getCar = (payload: number):GetCarAction => ({
    type: GET_CAR,
    payload
});

export const initCars = (params: CarsRequestParams):InitCarsAction => ({
    type: INIT_CARS,
    payload: params
});

export const getCars = (payload: CarsRequestParams):GetCarsAction => ({
    type: GET_CARS,
    payload
});

export const setCarsFilters = (filters: CarsFilters = {}): SetCarsFiltersAction => ({
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

export const initFavourities = (params: CarsFilters):InitFavouriteAction => ({
    type: INIT_FAVOURITIES,
    payload: params
});

export const getFavourite = (params?: CarsFilters):GetFavouriteAction => ({
    type: GET_FAVOURITE,
    payload: params
});

export const addFavourite = (id: number):AddFavouriteAction => ({
    type: ADD_FAVOURITE,
    payload: id
});

export const removeFavourite = (id: number):RemoveFavouriteAction => ({
    type: REMOVE_FAVOURITE,
    payload: id
});

export const updateFavourite = (payload: UpdateFavouritePayload):UpdateFavouriteAction => ({
    type: UPDATE_FAVOURITE,
    payload
});

export const fetchCars = ({
    page,
    manufacturer,
    color,
    sort
}:CarsRequestParams):ApiRequestAction => ({
    endpoint: API_CARS,
    type: API_REQUEST,
    types: [GET_CARS_REQUEST, ENTITIES, GET_CARS_ERROR],
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

export const fetchCar = (id:number):ApiRequestAction => ({
    endpoint: `${API_CARS}/${id}`,
    type: API_REQUEST,
    types: [GET_CAR_REQUEST, ENTITIES, GET_CAR_ERROR],
    onSuccess: ({ car }: CarResponse):EntitiesPayload => ({
        schema: Car,
        action: GET_CAR_SUCCESS,
        data: car
    })
});

export const fetchColors = ():ApiRequestAction => ({
    endpoint: API_COLORS,
    type: API_REQUEST,
    types: [GET_COLORS_REQUEST, GET_COLORS_SUCCESS, GET_COLORS_ERROR],
    onSuccess: ({ colors }:ColorsResponse) => colors
});

export const fetchManufacturers = ():ApiRequestAction => ({
    endpoint: API_MANUFACTURERS,
    type: API_REQUEST,
    types: [GET_MANUFACTURERS_REQUEST, GET_MANUFACTURERS_SUCCESS, GET_MANUFACTURERS_ERROR],
    onSuccess: ({ manufacturers }:ManufacturersResponse) => manufacturers
});
