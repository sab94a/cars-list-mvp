//@flow

import React from 'react';
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
    }
};

// configurate my own library link
LibLink.Component = ({ href, children, ...rest }) => (
    <Link to={ href } {...rest}>{ children }</Link>
);

const App = ({ routes, navigation, strings: { copyright } }: Props) => (
    <BrowserRouter>
        <Layout navigation={ navigation } footerText={ copyright }>
            <Switch>
                { routes.map((route, index) => (
                    <Route key={ index } {...route} />
                )) }
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default React.memo<Props>(App);
