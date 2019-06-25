//@flow

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import type { Route as RouteType } from 'types/routes';
import type { NavItem } from 'components/lib/types';
import Layout from 'components/Layout';
import LibLink from 'components/lib/Link';

type Props = {
    routes: Array<RouteType>,
    navigation: Array<NavItem>,
    strings: {
        [string]: string
    },
    store: any
};

// configurate my own library link
LibLink.Component = ({ href, children, ...rest }) => (
    <Link to={ href } {...rest}>{ children }</Link>
);

const App = ({ store, routes, navigation, strings: { copyright } }: Props) => (
    <Provider store={ store }>
        <BrowserRouter>
            <Layout navigation={ navigation } footerText={ copyright }>
                <Switch>
                    { routes.map((route, index) => (
                        <Route key={ index } {...route} />
                    )) }
                </Switch>
            </Layout>
        </BrowserRouter>
    </Provider>
);

export default React.memo<Props>(App);
