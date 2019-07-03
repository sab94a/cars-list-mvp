// @flow

import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { Car } from '../entities';

import type { 
    ReduxState,
    FavouriteState,
    CarsState, 
    CarState,
    EntitiesState, 
    ColorState, 
    ManufacturerState
} from 'types/store';

import { CARS_PER_PAGE } from 'constants/api'

import type { PagesNavigation, RouterProps } from 'types/routes';
import type { CarView, SelectView } from 'types/views';
import type { Manufacturer } from 'types/models';

import { getCarInfo } from 'helpers';

const selectCarsState = ({ cars }: ReduxState):CarsState => cars;
const selectEntitiesState = ({ entities }: ReduxState):EntitiesState => entities;
const selectColorState = ({ colors }:ReduxState):ColorState => colors;
const selectManufacturerState = ({ manufacturers }:ReduxState):ManufacturerState => manufacturers;
const selectItemCarsState = ({ car }: ReduxState):CarState => car;
const selectFavouriteState = ({ favourites }: ReduxState):FavouriteState => favourites;
const selectCarIdFromProps = (state: ReduxState, { match: { params } }:RouterProps):number => +params.id;

const selectCarsIds = createSelector(
    selectCarsState,
    ({ pages, page }:CarsState):Array<number> => pages[page] || []
);

export const selectCarsLoading = createSelector(
    selectCarsState,
    ({ loading }:CarsState):boolean => loading
);

export const selectNavigation = createSelector(
    selectCarsState,
    selectCarsIds,
    ({ totalPages, totalItems, page }:CarsState, currents:Array<number>):PagesNavigation => {
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
    selectFavouriteState,
    (ids:Array<number>, entities:EntitiesState, { items }:FavouriteState):Array<CarView> =>
        denormalize(ids, [Car], entities).map(item => getCarInfo(item, items))
);

export const selectColors = createSelector(
    selectColorState,
    ({items = []}:ColorState):Array<SelectView> => items.map(color => ({
        title: color,
        value: color
    }))
);

export const selectManufacturers = createSelector(
    selectManufacturerState,
    ({ items = []}:ManufacturerState):Array<SelectView> => items.map(({ name }:Manufacturer) => ({
        title: name,
        value: name
    }))
);

export const selectFilters = createSelector(
    selectCarsState,
    ({ sort, color, manufacturer } ) => ({ sort, color, manufacturer })
);

export const selectCar = createSelector(
    selectItemCarsState,
    selectCarIdFromProps,
    selectEntitiesState,
    selectFavouriteState,
    ({ item }:CarState, propsId:number, entities:EntitiesState, { items }:FavouriteState):?CarView => {
        if (item && item === propsId) {
            return getCarInfo(denormalize(item, Car, entities), items)
        }
        return null
    }
        
)

export const selectCarError = createSelector(
    selectItemCarsState,
    ({ error }:CarState) => error
);

export const selectFavourites = createSelector(
    selectFavouriteState,
    ({ items }:FavouriteState) =>
        items.map(item => getCarInfo(item))
)

export const selectFavouriteFilters = createSelector(
    selectFavouriteState,
    ({ sort, color, manufacturer } ) => ({ sort, color, manufacturer })
)
