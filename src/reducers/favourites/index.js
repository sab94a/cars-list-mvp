// @flow

import type { FavouriteState, Action } from 'types/store';
import { UPDATE_FAVOURITE } from 'constants/actions';

const favouritesReducer = (state:FavouriteState = [], action: Action):ColorState => {
    switch(action.type) {
        case UPDATE_FAVOURITE:
            return action.payload
        default:
            return state;
    }
};

export default favouritesReducer;
