// @flow

import type { CarState, Action } from 'types/store';
import {
    GET_CAR_REQUEST,
    GET_CAR_SUCCESS,
    GET_CAR_ERROR
} from 'constants/actions';

export const defaultState: CarState = {
    item: null,
    loading: false,
    error: null
}

const carReducer = (state:CarState = defaultState, action: Action):CarState => {
    switch(action.type) {
        case GET_CAR_REQUEST:
            return {
                ...state,
                error: null,
                loading: true
            }
        case GET_CAR_SUCCESS:
            return {
                ...state,
                loading: false,
                item: action.payload
            }
        case GET_CAR_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
};

export default carReducer;
