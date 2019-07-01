// @flow

import { combineReducers } from 'redux';
import cars from 'reducers/cars';
import car from 'reducers/car';
import colors from 'reducers/colors';
import manufacturers from 'reducers/manufacturer';
import entities from 'reducers/entities';
import favourites from 'reducers/favourites';

export default combineReducers({
    car,
    cars,
    colors,
    entities,
    manufacturers,
    favourites
});
