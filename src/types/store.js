//@flow

import * as A from 'constants/actions';
import type { Car, Manufacturer } from './models';
import type { CarsRequestParams, CarsFilters } from './api';

// States

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

export type CarState          = ItemState<number>;
export type CarsState         = PagesState<number> & CarsRequestParams;
export type ColorState        = CollectionState<string>;
export type ManufacturerState = CollectionState<Manufacturer>;

export type EntitiesState = {
    [string]: {
        [string]: mixed
    }
}

export type FavouriteState = {
    items: Array<Car>
} & CarsFilters;

export type ReduxState = {
    car: CarState,
    cars: CarsState,
    colors: ColorState,
    entities: EntitiesState,
    manufacturers: ManufacturerState,
    favourites: FavouriteState
};

// Actions

export type ActionSimple<T> = {|
    type: T
|};

export type ActionWithData<T, P> = {|
    type: T,
    payload: P
|};

// Init actions

export type InitCarAction         = ActionWithData<typeof A.INIT_CAR, number>;
export type InitCarsAction        = ActionWithData<typeof A.INIT_CARS, CarsRequestParams>;
export type InitFavouriteAction   = ActionWithData<typeof A.INIT_FAVOURITIES, CarsFilters>;

// Cars Actions

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
export type SetCarsFiltersAction = ActionWithData<typeof A.SET_CARS_FILTER, CarsFilters>;
export type SetCarsPageAction    = ActionWithData<typeof A.SET_CARS_PAGE, number>;
export type ClearCarsPagesAction = ActionSimple<typeof A.CLEAR_CARS_PAGES>;

// Car Actions

export type GetCarAction         = ActionWithData<typeof A.GET_CAR, number>;
export type GetCarRequestAction  = ActionSimple<typeof A.GET_CAR_REQUEST>;
export type GetCarSuccessAction  = ActionWithData<typeof A.GET_CAR_SUCCESS, number>;
export type GetCarErrorAction    = ActionWithData<typeof A.GET_CAR_ERROR, string>;

// Entities Actions

export type EntitiesPayload = {
    schema: mixed,
    data: mixed,
    action: string
};

export type EntitiesResolvePayload = {
    [string]: mixed
};
export type EntitiesAction              = ActionWithData<typeof A.ENTITIES, EntitiesPayload>;
export type EntitiesResolveAction       = ActionWithData<typeof A.ENTITIES_RESOLVE, EntitiesResolvePayload>;

// Colors Actions

export type ColorRequestAction          = ActionSimple<typeof A.GET_COLORS_REQUEST>;
export type ColorSuccessPayload         = Array<string>;
export type ColorSuccessAction          = ActionWithData<typeof A.GET_COLORS_SUCCESS, ColorSuccessPayload>;
export type ColorErrorAction            = ActionWithData<typeof A.GET_COLORS_ERROR, string>;

// Manufacturers Actions

export type ManufacturerRequestAction   = ActionSimple<typeof A.GET_MANUFACTURERS_REQUEST>;
export type ManufacturerSuccessPayload  = Array<Manufacturer>
export type ManufacturerSuccessAction   = ActionWithData<typeof A.GET_MANUFACTURERS_SUCCESS, ManufacturerSuccessPayload>;
export type ManufacturerErrorAction     = ActionWithData<typeof A.GET_MANUFACTURERS_ERROR, string>;

// Favourites Actions

export type GetFavouriteAction          = ActionWithData<typeof A.GET_FAVOURITE, ?CarsFilters>;
export type RemoveFavouriteAction       = ActionWithData<typeof A.REMOVE_FAVOURITE, number>;
export type AddFavouriteAction          = ActionWithData<typeof A.ADD_FAVOURITE, number>;
export type UpdateFavouritePayload      = FavouriteState;
export type UpdateFavouriteAction       = ActionWithData<typeof A.UPDATE_FAVOURITE, UpdateFavouritePayload>;

export type Action = 
    InitFavouriteAction |
    InitCarsAction |
    InitCarAction |
    GetCarAction |
    GetCarRequestAction |
    GetCarSuccessAction |
    GetCarErrorAction |
    GetCarsAction |
    GetCarsRequestAction |
    GetCarsSuccessAction |
    GetCarsErrorAction |
    ClearCarsPagesAction |
    SetCarsFiltersAction |
    SetCarsPageAction |
    ColorRequestAction |
    ColorSuccessAction |
    ColorErrorAction |
    ManufacturerRequestAction |
    ManufacturerSuccessAction |
    ManufacturerErrorAction |
    GetFavouriteAction |
    RemoveFavouriteAction |
    AddFavouriteAction |
    UpdateFavouriteAction |
    EntitiesResolveAction |
    EntitiesAction;

export type Dispatch = (action: Action) => any;

