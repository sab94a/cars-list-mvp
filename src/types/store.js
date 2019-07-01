//@flow

import * as A from 'constants/actions';
import type { Car, Manufacturer } from './models';
import type { CarsRequestParams, CarsFilters } from './api';

export type CollectionState<Item> = {
    items: Array<Item>,
    loading: boolean,
    error: ?string
};

export type ItemState<Item> = {
    item: ?Item,
    loading: boolean,
    error: ?string
}

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

export type ColorState = CollectionState<string>;
export type ManufacturerState = CollectionState<Manufacturer>;
export type CarState = PagesState<number> & CarsRequestParams;
export type CarItemState = ItemState<number>;

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

export type InitAction            = ActionSimple<typeof A.INIT>;
export type GetCarsAction         = ActionWithData<typeof A.GET_CARS, CarsRequestParams>;
export type GetCarsRequestAction  = ActionSimple<typeof A.GET_CARS_REQUEST>;
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

export type GetCarAction         = ActionWithData<typeof A.GET_CAR, number>;
export type GetCarRequestAction  = ActionSimple<typeof A.GET_CAR_REQUEST>;
export type GetCarSuccessAction  = ActionWithData<typeof A.GET_CAR_SUCCESS, number>;
export type GetCarErrorAction    = ActionWithData<typeof A.GET_CAR_ERROR, string>;

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

export type ColorRequestAction = ActionSimple<typeof A.GET_COLORS_REQUEST>;
export type ColorSuccessPayload = Array<string>;
export type ColorSuccessAction = ActionWithData<typeof A.GET_COLORS_SUCCESS, ColorSuccessPayload>;
export type ColorErrorAction = ActionWithData<typeof A.GET_COLORS_ERROR, string>;

export type ManufacturerRequestAction = ActionSimple<typeof A.GET_MANUFACTURERS_REQUEST>;
export type ManufacturerSuccessPayload = Array<Manufacturer>
export type ManufacturerSuccessAction = ActionWithData<typeof A.GET_MANUFACTURERS_SUCCESS, ManufacturerSuccessPayload>;
export type ManufacturerErrorAction = ActionWithData<typeof A.GET_MANUFACTURERS_ERROR, string>;

export type Action = 
    InitAction |
    GetCarAction |
    GetCarRequestAction |
    GetCarSuccessAction |
    GetCarErrorAction |
    GetCarsAction |
    GetCarsRequestAction |
    GetCarsSuccessAction |
    GetCarsErrorAction |
    ClearCarsPagesAction |
    SetCarsFilterAction |
    SetCarsPageAction |
    ColorRequestAction |
    ColorSuccessAction |
    ColorErrorAction |
    ManufacturerRequestAction |
    ManufacturerSuccessAction |
    ManufacturerErrorAction |
    EntitiesAction |
    EntitiesResolveAction;

export type Dispatch = (action: Action) => any;

