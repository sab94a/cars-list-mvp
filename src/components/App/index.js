//@flow

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import type { Route as RouteType } from 'types/routes';
import Layout from 'components/Layout';

export type Props = {
    routes: Array<RouteType>
}

const App = ({ routes }: Props) => (
    <BrowserRouter>
        <Layout>
            <Switch>
                { routes.map((route, index) => (
                    <Route key={ index } {...route} />
                )) }
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default App;
