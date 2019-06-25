// @flow

import MainPage from 'components/pages/Main';
import { connect } from 'react-redux';
import type { ReduxState } from 'types/store';

const mapStateToProps = ({ cars }:ReduxState) => {
    return { cars }
}

export default connect(mapStateToProps)(MainPage);
