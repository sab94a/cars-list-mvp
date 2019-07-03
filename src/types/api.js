//@flow

import * as A from 'constants/actions';
import type { Car, Manufacturer } from './models'

export type CarsFilters = {
    manufacturer?: ?string,
    color?: ?string,
    sort?: ?string
}

export type CarsRequestParams = {
    page?: number
} & CarsFilters;

export type CarResponse = {
    car: Car
}

export type CarsResponse = {
    cars: Array<Car>,
    totalPageCount: number,
    totalCarsCount: number
}

export type ColorsResponse = {
    colors: Array<string>
}

export type ManufacturersResponse = {
    manufacturers: Array<Manufacturer>
}

export type ApiRequestParams = {
    endpoint: string,
    method?: string,
    query?: mixed,
    onSuccess?: (res: any) => any,
    onError?: (res: any) => any
};

export type ApiRequestAction = {
    type: typeof A.API_REQUEST,
    types: Array<string>,
} & ApiRequestParams;
