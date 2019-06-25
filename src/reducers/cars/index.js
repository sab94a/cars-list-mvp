// @flow

import type { CarState, Action } from 'types/store';
import {
    GET_CAR_REUQUEST,
    GET_CAR_SUCCESS,
    GET_CAR_ERROR
} from 'constants/actions';

export const defaultState: CarState = {
    items: [],
    error: null,
    loading: false
}

const carReducer = (state:CarState = defaultState, action: Action):CarState => {
    switch(action.type) {
        case GET_CAR_REUQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_CAR_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                items: action.payload
            }
        case GET_CAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

export default carReducer;
