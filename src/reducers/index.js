// @flow

import { combineReducers } from 'redux';
import cars from 'reducers/cars';
import entities from 'reducers/entities';

export default combineReducers({
    cars,
    entities
});
