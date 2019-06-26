// @flow

import { 
    API_REQUEST,    
    GET_CAR_REUQUEST,
    GET_CAR_SUCCESS,
    GET_CAR_ERROR
} from 'constants/actions';
import {
    API_CARS
} from 'constants/api';

import type { ApiRequest } from 'types/store';

export const fetchCars = ():ApiRequest => ({
    endpoint: API_CARS,
    type: API_REQUEST,
    types: [GET_CAR_REUQUEST, GET_CAR_SUCCESS, GET_CAR_ERROR]
});
