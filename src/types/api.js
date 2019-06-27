//@flow

import * as A from 'constants/actions';
import type { Car } from './models'

export type ApiRequestParams = {
    endpoint: string,
    method?: string,
    query?: mixed,
    onSuccess?: (res: any) => mixed,
    onError?: (res: any) => mixed
};

export type ApiRequest = {
    type: typeof A.API_REQUEST,
    types: Array<string>,
} & ApiRequestParams;

export type CarsRequestParams = {
    page: number,
    manufacturer?: string,
    color?: string,
    sort?: 'asc' | 'des'
}

export type CarsResponse = {
    cars: Array<Car>,
    totalPageCount: number,
    totalCarsCount: number
}
