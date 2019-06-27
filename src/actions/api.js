// @flow

import { 
    API_REQUEST,
    ENTITIES,    
    GET_CARS_REUQUEST,
    GET_CARS_SUCCESS,
    GET_CARS_ERROR
} from 'constants/actions';
import { API_CARS } from 'constants/api';
import { Car } from '../entities';
import type { ApiRequest, CarsRequestParams, CarsResponse } from 'types/api';
import type { EntitiesPayload } from 'types/store';

const defaultCarsQuery = { page: 1 }

export const fetchCars = (query: CarsRequestParams = defaultCarsQuery):ApiRequest => ({
    endpoint: API_CARS,
    type: API_REQUEST,
    types: [GET_CARS_REUQUEST, ENTITIES, GET_CARS_ERROR],
    query,
    onSuccess: ({ cars, totalPageCount, totalCarsCount }: CarsResponse):EntitiesPayload => ({
        schema: { items: [Car] },
        action: GET_CARS_SUCCESS,
        data: {
            items: cars,
            page: query.page,
            totalPages: totalPageCount,
            totalItems: totalCarsCount
        }
    })
});
