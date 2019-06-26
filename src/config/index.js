import Main from 'containers/Main';
import Car from 'components/pages/Car';
import NotFound from 'components/pages/NotFound';

export const RoutesMap = {
    Root: {
        path: '/',
        exact: true,
        component: Main
    },
    Favourite: {
        path: '/favourite',
        component: Main
    },
    Car: {
        path: '/car/:id/',
        component: Car
    },
    NotFound: {
        component: NotFound
    }
};

export const Router = [RoutesMap.Root, RoutesMap.Favourite, RoutesMap.Car, RoutesMap.NotFound];

export const Navigation= [{
    title: 'Favourite',
    href: RoutesMap.Favourite.path
}, {
    title: 'Home',
    href: RoutesMap.Root.path
}];

export const Strings = {
    copyright: '© AUTO1 Group 2018'
}
