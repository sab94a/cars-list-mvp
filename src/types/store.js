//@flow

import type { Car } from 'types/models';
import * as A from 'constants/actions';

export type CollectionState<Item> = {
    items: Array<Item>,
    loading: boolean,
    error: ?string
};

export type CarState = CollectionState<number>;

export type ReduxState = {
    cars: CarState
};

export type ActionSimple<T> = {
    type: T
};

export type ActionWithData<T, P> = {
    type: T,
    payload: P
};

export type GetCarsRequest       = ActionSimple<typeof A.GET_CAR>;
export type GetCarsRequestAction = ActionSimple<typeof A.GET_CAR_REUQUEST>;
export type GetCarsSuccessAction = ActionWithData<typeof A.GET_CAR_SUCCESS, Array<number>>;
export type GetCarsErrorAction   = ActionWithData<typeof A.GET_CAR_ERROR, string>;

export type Action = 
    GetCarsRequest |
    GetCarsRequestAction |
    GetCarsSuccessAction |
    GetCarsErrorAction;
