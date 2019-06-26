// @flow

import MainPage from 'components/pages/Main';
import { connect } from 'react-redux';
import { fetchCars } from 'actions/api';
import type { ReduxState } from 'types/store';

const mapStateToProps = ({ cars }:ReduxState) => {
    return { cars }
}

const mapDispatchToProps = {
    fetchCars
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
