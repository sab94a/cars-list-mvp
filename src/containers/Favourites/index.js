// @flow

import MainPage from 'components/pages/Main';
import { connect } from 'react-redux';
import { initFavourities, getFavourite, removeFavourite } from 'actions';
import { SORTINGS } from 'constants/api';

import type { ReduxState, Dispatch } from 'types/store';
import type { CarsFilters } from 'types/api';
import type { CarView, SelectView } from 'types/views';
import type { RouterProps } from 'types/routes';

import { 
    selectFavourites, 
    selectColors,
    selectManufacturers,
    selectFavouriteFilters
} from 'selectors';

export type StateProps = {
    cars: Array<CarView>,
    colors: Array<SelectView>,
    manufacturers: Array<SelectView>,
    sortings: Array<SelectView>,
    filters: CarsFilters,
    search: string,
}

export type dispatchProps = {
    init: (params: CarsFilters) => void,
    update: (params: CarsFilters) => void,
    removeFavourite: (id: number) => void,
    navigate: (path: mixed | string) => void
}

const sortings = SORTINGS.map(type => ({
    title: type,
    value: type
}));

const mapStateToProps = (state: ReduxState, { location: { search } }:RouterProps):StateProps => ({
    cars: selectFavourites(state),
    colors: selectColors(state),
    manufacturers: selectManufacturers(state),
    filters: selectFavouriteFilters(state),
    search,
    sortings
});

const mapDispatchToProps = (dispatch: Dispatch, { history: { push } }:RouterProps):dispatchProps => {
    return {
        init: (params: CarsFilters) => dispatch(initFavourities(params)),
        update: (params: CarsFilters) => dispatch(getFavourite(params)),
        removeFavourite: (id: number) => dispatch(removeFavourite(id)),
        navigate: push
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
