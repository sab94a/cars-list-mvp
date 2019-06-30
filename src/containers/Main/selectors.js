// @flow

import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { Car } from '../../entities';

import type { 
    ReduxState, 
    CarState, 
    EntitiesState, 
    ColorState, 
    ManufacturerState, 
    Manufacturer 
} from 'types/store';

import { CARS_PER_PAGE } from 'constants/api'

import type { PagesNavigation } from 'types/routes';
import type { CarView } from 'types/views';

import { getCarInfo } from 'helpers';

const selectCarState = ({ cars }: ReduxState):CarState => cars;
const selectEntitiesState = ({ entities }: ReduxState):EntitiesState => entities;
const selectColorState = ({ colors }:ReduxState):ColorState => colors;
const selectManufacturerState = ({ manufacturers }:ReduxState):ManufacturerState => manufacturers

const selectCarsIds = createSelector(
    selectCarState,
    ({ pages, page }:CarState):Array<number> => pages[page] || []
);

export const selectCarsLoading = createSelector(
    selectCarState,
    ({ loading }:CarState):boolean => loading
);

export const selectNavigation = createSelector(
    selectCarState,
    selectCarsIds,
    ({ totalPages, totalItems, page }:CarState, currents:Array<number>):PagesNavigation => {
        const shownItems = (page - 1) * CARS_PER_PAGE + currents.length;

        return {
            shownItems,
            totalItems,
            totalPages,
            page
        }
    }
);

export const selectCars = createSelector(
    selectCarsIds,
    selectEntitiesState,
    (ids:Array<number>, entities:EntitiesState):Array<CarView> =>
        denormalize(ids, [Car], entities).map(getCarInfo)
);

export const selectColors = createSelector(
    selectColorState,
    ({items = []}:ColorState):Array<string> => items.map(color => ({
        title: color,
        value: color
    }))
);

export const selectManufacturers = createSelector(
    selectManufacturerState,
    ({ items = []}:ManufacturerState):Array<string> => items.map(({ name }:Manufacturer) => ({
        title: name,
        value: name
    }))
);
