// @flow

import type { CarsState, Action } from 'types/store';
import {
    GET_CARS_REQUEST,
    GET_CARS_SUCCESS,
    GET_CARS_ERROR,
    CLEAR_CARS_PAGES,
    SET_CARS_FILTER,
    SET_CARS_PAGE
} from 'constants/actions';

export const defaultState: CarsState = {
    pages: {},
    error: null,
    loading: false,
    color: null,
    manufacturer: null,
    sort: null,
    page: 1,
    totalPages: 0,
    totalItems: 0
}

const carReducer = (state:CarsState = defaultState, action: Action):CarsState => {
    switch(action.type) {
        case GET_CARS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_CARS_SUCCESS:
            const { page, totalPages, totalItems, items } = action.payload
            return {
                ...state,
                loading: false,
                error: null,
                pages: {
                    ...state.pages,
                    ...{
                        [page]: items
                    }
                },
                totalPages,
                totalItems,
                page,
            }
        case SET_CARS_PAGE: 
            return {
                ...state,
                page: action.payload
            }
        case SET_CARS_FILTER:
            const { color, manufacturer, sort } = action.payload
            return {
                ...state,
                color,
                manufacturer,
                sort
            }
        case CLEAR_CARS_PAGES:
            return {
                ...state,
                pages: {}
            }
        case GET_CARS_ERROR:
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
