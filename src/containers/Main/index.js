// @flow

import MainPage from 'components/pages/Main';
import { connect } from 'react-redux';
import { fetchCars } from 'actions';

import type { ReduxState, Dispatch } from 'types/store';
import type { CarsRequestParams } from 'types/api';
import type { CarView } from 'types/views';
import type { PagesNavigation } from 'types/routes';

import { selectCars, selectCarsLoading, selectNavigation } from './selectors'

export type StateProps = {
    cars: Array<CarView>,
    carsLoading: boolean,
    navigation: PagesNavigation
}

export type dispatchProps = {
    fetchData: (params: CarsRequestParams) => mixed
}

const mapStateToProps = (state: ReduxState):StateProps => ({
    cars: selectCars(state),
    carsLoading: selectCarsLoading(state),
    navigation: selectNavigation(state)
});

const mapDispatchToProps = (dispatch: Dispatch):dispatchProps => {
    return {
        fetchData: (params: CarsRequestParams) => dispatch(fetchCars(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
