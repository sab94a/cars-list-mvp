// @flow

import { combineReducers } from 'redux';
import cars from 'reducers/cars';
import colors from 'reducers/colors';
import manufacturers from 'reducers/manufacturer';
import entities from 'reducers/entities';

export default combineReducers({
    cars,
    colors,
    entities,
    manufacturers
});
