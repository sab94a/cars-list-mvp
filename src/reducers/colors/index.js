// @flow

import type { ColorState, Action } from 'types/store';
import {
    GET_COLORS_REQUEST,
    GET_COLORS_SUCCESS,
    GET_COLORS_ERROR
} from 'constants/actions';

export const defaultState: ColorState = {
    items: [],
    loading: false,
    error: null
}

const colorReducer = (state:ColorState = defaultState, action: Action):ColorState => {
    switch(action.type) {
        case GET_COLORS_REQUEST:
            return {
                ...state,
                error: null,
                loading: true
            }
        case GET_COLORS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            }
        case GET_COLORS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
};

export default colorReducer;
