// @flow

import CarPage from 'components/pages/Car';
import { connect } from 'react-redux';

import type { CarView } from 'types/views';
import type { ReduxState } from 'types/store';
import type { RouterProps } from 'types/route';

import { selectCar, selectCarError } from 'selectors';
import { fetchCar } from 'actions';

export type StateProps = {
    car: ?CarView,
    error: ?string
}

const mapStateToProps = (state:ReduxState, props: RouterProps) => ({
    car: selectCar(state, props),
    error: selectCarError(state)
});

const mapDispatchToProps = {
    fetchCar
};

export default connect(mapStateToProps, mapDispatchToProps)(CarPage);
