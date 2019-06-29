// @flow

import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { Car } from '../../entities';

import type { ReduxState, CarState, EntitiesState } from 'types/store';
import type { PagesNavigation } from 'types/routes';
import type { CarView } from 'types/views';

import { getCarInfo } from 'helpers';

const selectCarState = ({ cars }: ReduxState):CarState => cars;
const selectEntitiesState = ({ entities }: ReduxState):EntitiesState => entities;

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
        const carsPerPage = totalPages ? Math.floor(totalItems/totalPages) : 0;
        const shownItems = (page - 1) * carsPerPage + currents.length;
        
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
