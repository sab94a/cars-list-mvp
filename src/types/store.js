//@flow

import * as A from 'constants/actions';
import type { Car } from './models'

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

export type CarState = PagesState<number>;

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

export type GetCarsRequest       = ActionSimple<typeof A.GET_CARS>;
export type GetCarsRequestAction = ActionSimple<typeof A.GET_CARS_REUQUEST>;
export type GetCarsSuccessPayload = {
    page: number,
    items: Array<number>,
    totalPages: number,
    totalItems: number,
}
export type GetCarsSuccessAction = ActionWithData<typeof A.GET_CARS_SUCCESS, GetCarsSuccessPayload>;
export type GetCarsErrorAction   = ActionWithData<typeof A.GET_CARS_ERROR, string>;
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
    GetCarsRequest |
    GetCarsRequestAction |
    GetCarsSuccessAction |
    GetCarsErrorAction |
    ClearCarsPagesAction |
    EntitiesAction |
    EntitiesResolveAction;


