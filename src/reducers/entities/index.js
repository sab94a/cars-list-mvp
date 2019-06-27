//@flow

import type { EntitiesState, Action } from 'types/store';
import { ENTITIES_RESOLVE } from 'constants/actions';

const entitiesReducer = (state:EntitiesState = {}, action:Action):EntitiesState => {
    switch(action.type) {
        case ENTITIES_RESOLVE:
            let _state = { ...state };

            for (let entity in action.payload) {
                _state = {
                    ..._state,
                    [entity]: {
                        ..._state[entity],
                        ...action.payload[entity]
                    }
                }
            }

            return _state;
        default:
            return state;
    };
};

export default entitiesReducer;
