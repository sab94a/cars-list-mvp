// @flow

import type { FavouriteState, Action } from 'types/store';
import { UPDATE_FAVOURITE } from 'constants/actions';

const defaultState = {
    items: [],
    color: null,
    manufacturer: null,
    sort: null,
}

const favouritesReducer = (state:FavouriteState = defaultState, action: Action):FavouriteState => {
    switch(action.type) {
        case UPDATE_FAVOURITE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export default favouritesReducer;
