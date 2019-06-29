//@flow

import * as A from 'constants/actions';
import type { Car } from './models';
import type { CarsRequestParams, CarsFilters } from './api';

export type CollectionState<Item> = {
    items: Array<Item>,
    loading: boolean,
    error: ?string
};

export type PagesState<Ttem> = {
    pages: {
        [number]: Array<Ttem>
    },
    page: number,
    totalPages: number,
    totalItems: number,
    loading: boolean,
    error: ?string
};

export type CarState = PagesState<number> & CarsRequestParams;

export type EntitiesState = {
    [string]: Car
}

export type ReduxState = {
    cars: CarState,
    entities: EntitiesState
};

export type ActionSimple<T> = {
    type: T
};

export type ActionWithData<T, P> = {
    type: T,
    payload: P
};

export type GetCarsAction         = ActionWithData<typeof A.GET_CARS, CarsRequestParams>;
export type GetCarsRequestAction  = ActionSimple<typeof A.GET_CARS_REUQUEST>;
export type GetCarsSuccessPayload = {
    page: number,
    items: Array<number>,
    totalPages: number,
    totalItems: number,
}
export type GetCarsSuccessAction = ActionWithData<typeof A.GET_CARS_SUCCESS, GetCarsSuccessPayload>;
export type GetCarsErrorAction   = ActionWithData<typeof A.GET_CARS_ERROR, string>;
export type SetCarsFilterAction  = ActionWithData<typeof A.SET_CARS_FILTER, CarsFilters>;
export type SetCarsPageAction    = ActionWithData<typeof A.SET_CARS_PAGE, number>;
export type ClearCarsPagesAction = ActionSimple<typeof A.CLEAR_CARS_PAGES>;

export type EntitiesPayload = {
    schema: mixed,
    data: mixed,
    action: string
};
export type EntitiesAction = ActionWithData<typeof A.ENTITIES, EntitiesResolvePayload>;

export type EntitiesResolvePayload = {
    [string]: mixed
};
export type EntitiesResolveAction = ActionWithData<typeof A.ENTITIES_RESOLVE, EntitiesResolvePayload>;



export type Action = 
    GetCarsAction |
    GetCarsRequestAction |
    GetCarsSuccessAction |
    GetCarsErrorAction |
    ClearCarsPagesAction |
    SetCarsFilterAction |
    SetCarsPageAction |
    EntitiesAction |
    EntitiesResolveAction;

export type Dispatch = (action: Action) => any;

