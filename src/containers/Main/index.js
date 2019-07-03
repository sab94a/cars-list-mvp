// @flow

import MainPage from 'components/pages/Main';
import { connect } from 'react-redux';
import { getCars, initCars, removeFavourite } from 'actions';
import { SORTINGS } from 'constants/api';

import type { ReduxState, Dispatch } from 'types/store';
import type { CarsRequestParams, CarsFilters } from 'types/api';
import type { CarView, SelectView } from 'types/views';
import type { PagesNavigation, RouterProps } from 'types/routes';

import { 
    selectCars, 
    selectCarsLoading, 
    selectNavigation,
    selectColors,
    selectManufacturers,
    selectFilters
} from 'selectors';

export type StateProps = {
    cars: Array<CarView>,
    carsLoading: boolean,
    navigation: PagesNavigation,
    colors: Array<SelectView>,
    manufacturers: Array<SelectView>,
    sortings: Array<SelectView>,
    filters: CarsFilters,
    search: string
}

export type dispatchProps = {
    init: (params: CarsRequestParams) => mixed,
    update: (params: CarsRequestParams) => mixed,
    removeFavourite: (id: number) => mixed,
    navigate: (path: mixed | string) => void
}

const sortings = SORTINGS.map(type => ({
    title: type,
    value: type
}));

const mapStateToProps = (state: ReduxState, { location: { search } }:RouterProps):StateProps => ({
    cars: selectCars(state),
    carsLoading: selectCarsLoading(state),
    navigation: selectNavigation(state),
    colors: selectColors(state),
    manufacturers: selectManufacturers(state),
    filters: selectFilters(state),
    search,
    sortings
});

const mapDispatchToProps = (dispatch: Dispatch, { history: { push } }: RouterProps):dispatchProps => {
    return {
        init: (params: CarsRequestParams) => dispatch(initCars(params)),
        update: (params: CarsRequestParams) => dispatch(getCars(params)),
        removeFavourite: (id: number) => dispatch(removeFavourite(id)),
        navigate: push
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
