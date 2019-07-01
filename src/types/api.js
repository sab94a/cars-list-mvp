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

export type ApiRequestAction = {
    type: typeof A.API_REQUEST,
    types: Array<string>,
} & ApiRequestParams;

export type SortFilter = 'asc' | 'des';

export type CarsFilters = {
    manufacturer: ?string,
    color: ?string,
    sort: ?SortFilter
}
export type CarsRequestParams = {
    page: number
} & CarsFilters;

export type CarsResponse = {
    cars: Array<Car>,
    totalPageCount: number,
    totalCarsCount: number
}

export type CarResponse = {
    car: Car
}
