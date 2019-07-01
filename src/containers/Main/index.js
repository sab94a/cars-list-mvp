// @flow

import MainPage from 'components/pages/Main';
import { connect } from 'react-redux';
import { getCars, initCars } from 'actions';
import { SORTINGS } from 'constants/api';

import type { ReduxState, Dispatch } from 'types/store';
import type { CarsRequestParams, CarsFilters } from 'types/api';
import type { CarView } from 'types/views';
import type { PagesNavigation } from 'types/routes';

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
    color: Array<string>,
    manufacturers: Array<string>,
    sortings: Array<string>,
    filters: CarsFilters
}

export type dispatchProps = {
    update: (params: CarsRequestParams) => mixed,
    initCars: (params: CarsRequestParams) => mixed
}

const sortings = SORTINGS.map(type => ({
    title: type,
    value: type
}));

const mapStateToProps = (state: ReduxState):StateProps => ({
    cars: selectCars(state),
    carsLoading: selectCarsLoading(state),
    navigation: selectNavigation(state),
    colors: selectColors(state),
    manufacturers: selectManufacturers(state),
    filters: selectFilters(state),
    sortings
});

const mapDispatchToProps = (dispatch: Dispatch):dispatchProps => {
    return {
        init: (params: CarsRequestParams) => dispatch(initCars(params)),
        update: (params: CarsRequestParams) => dispatch(getCars(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
