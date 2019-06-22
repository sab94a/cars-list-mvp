// @flow

import type { Route } from 'types/routes';
import Main from 'components/pages/Main';
import Car from 'components/pages/Car';
import NotFound from 'components/pages/NotFound';

const routes: Array<Route> = [
    {
        path: '/',
        exact: true,
        component: Main
    },
    {
        path: '/car/:id',
        component: Car
    },
    {
        component: NotFound
    }
];

export default routes
