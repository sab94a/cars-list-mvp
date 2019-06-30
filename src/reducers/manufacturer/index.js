// @flow

import type { ManufacturerState, Action } from 'types/store';
import {
    GET_MANUFACTURERS_REQUEST,
    GET_MANUFACTURERS_SUCCESS,
    GET_MANUFACTURERS_ERROR
} from 'constants/actions';

export const defaultState: ManufacturerState = {
    items: [],
    loading: false,
    error: null
}

const manufacturerReducer = (state:ManufacturerState = defaultState, action: Action):ManufacturerState => {
    switch(action.type) {
        case GET_MANUFACTURERS_REQUEST:
            return {
                ...state,
                error: null,
                loading: true
            }
        case GET_MANUFACTURERS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            }
        case GET_MANUFACTURERS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default manufacturerReducer;
