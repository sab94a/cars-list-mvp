// @flow

import CarPage from 'components/pages/Car';
import { connect } from 'react-redux';

import type { CarView } from 'types/views';
import type { ReduxState, Dispatch } from 'types/store';
import type { RouterProps } from 'types/route';

import { selectCar, selectCarError, selectFavouriteStatus } from 'selectors';
import { initCar, addFavourite, removeFavourite } from 'actions';

export type StateProps = {
    car: ?CarView,
    error: ?string,
    isFavourite: boolean
};

export type dispatchProps = {
    update: (params: CarsRequestParams) => mixed,
    initCars: (params: CarsRequestParams) => mixed
};

const mapStateToProps = (state:ReduxState, props: RouterProps) => ({
    car: selectCar(state, props),
    error: selectCarError(state),
    isFavourite: selectFavouriteStatus(state)
});

const mapDispatchToProps = (dispatch: Dispatch, { match: { params } }:RouterProps):dispatchProps => ({
    init: () => dispatch(initCar(+params.id)),
    addFavourite: () => dispatch(addFavourite(+params.id)),
    removeFavourite: () => dispatch(removeFavourite(+params.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarPage);
