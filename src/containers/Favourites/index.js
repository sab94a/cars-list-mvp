// @flow

import MainPage from 'components/pages/Main';
import { connect } from 'react-redux';
import { initFavourities, getFavourite, removeFavourite } from 'actions';
import { SORTINGS } from 'constants/api';

import type { ReduxState, Dispatch } from 'types/store';
import type { CarsRequestParams, CarsFilters } from 'types/api';
import type { CarView, SelectView } from 'types/views';
import type { PagesNavigation } from 'types/routes';

import { 
    selectFavourites, 
    selectColors,
    selectManufacturers,
    selectFavouriteFilters
} from 'selectors';

export type StateProps = {
    cars: Array<CarView>,
    navigation: ?PagesNavigation,
    colors: Array<SelectView>,
    manufacturers: Array<SelectView>,
    sortings: Array<SelectView>,
    filters: CarsFilters
}

export type dispatchProps = {
    init: (params: CarsRequestParams) => mixed,
    update: (params: CarsRequestParams) => mixed,
    removeFavourite: (id: number) => mixed
}

const sortings = SORTINGS.map(type => ({
    title: type,
    value: type
}));

const mapStateToProps = (state: ReduxState):StateProps => ({
    cars: selectFavourites(state),
    colors: selectColors(state),
    manufacturers: selectManufacturers(state),
    filters: selectFavouriteFilters(state),
    sortings
});

const mapDispatchToProps = (dispatch: Dispatch):dispatchProps => {
    return {
        init: (params: CarsRequestParams) => dispatch(initFavourities(params)),
        update: (params: CarsRequestParams) => dispatch(getFavourite(params)),
        removeFavourite: (id: number) => dispatch(removeFavourite(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
