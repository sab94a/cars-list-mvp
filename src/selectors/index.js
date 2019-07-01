// @flow

import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { Car } from '../entities';

import type { 
    ReduxState,
    FavouriteState,
    CarState, 
    CarItemState,
    EntitiesState, 
    ColorState, 
    ManufacturerState, 
    Manufacturer 
} from 'types/store';

import { CARS_PER_PAGE } from 'constants/api'

import type { PagesNavigation, RouterProps } from 'types/routes';
import type { CarView, SelectView } from 'types/views';

import { getCarInfo } from 'helpers';

const selectCarState = ({ cars }: ReduxState):CarState => cars;
const selectEntitiesState = ({ entities }: ReduxState):EntitiesState => entities;
const selectColorState = ({ colors }:ReduxState):ColorState => colors;
const selectManufacturerState = ({ manufacturers }:ReduxState):ManufacturerState => manufacturers;
const selectItemCarState = ({ car }: ReduxState):CarItemState => car;
const selectFavouriteState = ({ favourites }: ReduxState):FavouriteState => favourites || [];
const selectCarIdFromProps = (state: ReduxState, { match: { params } }:RouterProps):number => +params.id;

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
    selectFavouriteState,
    (ids:Array<number>, entities:EntitiesState, favourites:FavouriteState):Array<CarView> =>
        denormalize(ids, [Car], entities).map(item => getCarInfo(item, favourites))
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
    selectCarState,
    ({ sort, color, manufacturer } ) => ({ sort, color, manufacturer })
);

export const selectCar = createSelector(
    selectItemCarState,
    selectCarIdFromProps,
    selectEntitiesState,
    selectFavouriteState,
    ({ item }:CarItemState, propsId:number, entities:EntitiesState, favourites:FavouriteState):?CarView => {
        if (item && item === propsId) {
            return getCarInfo(denormalize(item, Car, entities), favourites)
        }
        return null
    }
        
)

export const selectCarError = createSelector(
    selectItemCarState,
    ({ error }:CarItemState):string => error
);
