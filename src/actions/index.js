// @flow

import { 
    GET_CARS, 
    CLEAR_CARS_PAGES, 
    SET_CARS_FILTER, 
    SET_CARS_PAGE 
} from 'constants/actions';

import type { CarsRequestParams, CarsFilters } from 'types/api';

import type { 
    GetCarsAction, 
    SetCarsFilterAction, 
    SetCarsPageAction, 
    ClearCarsPagesAction 
} from 'types/store';

export const fetchCars = (payload: CarsRequestParams):GetCarsAction => ({
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
